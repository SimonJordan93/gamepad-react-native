import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useDebounce } from "use-debounce";
import Swiper from "react-native-swiper";

import renderPlatforms from "../../components/Platforms";
import FilterModal from "../../components/FilterModal";

export default function FilterPlatformsGamesScreen({ route }) {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [debouncedGameSearch] = useDebounce(gameSearch, 300);
  const [sortingOption, setSortingOption] = useState("");
  const flatListRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const { height, width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      // alert(" Games was focused");
      const fetchGames = async () => {
        try {
          const resGames = await axios.get(
            `https://site--gamepad-back--6h6hqnm2zbqs.code.run/games?platforms=${route.params.platformId}&search=${debouncedGameSearch}&page=${page}&ordering=${sortingOption}`
          );
          // console.log(route.params.platformId);
          if (page === 1) {
            setGames(resGames.data.results);
            setLoading(false);
          } else {
            setGames((prevGames) => [...prevGames, ...resGames.data.results]);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchGames();

      return () => {
        // alert(" Games was unfocused");
        fetchGames;
      };
    }, [page, debouncedGameSearch, sortingOption])
  );

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterClose = () => {
    setFilterModalVisible(false);
  };

  const handleTextChange = (text) => {
    setGameSearch(text);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByAToZ = () => {
    setSortingOption("name");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByZToA = () => {
    setSortingOption("-name");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByEarliest = () => {
    setSortingOption("released");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByMostRecent = () => {
    setSortingOption("-released");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByHighest = () => {
    setSortingOption("-rating");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSortByLowest = () => {
    setSortingOption("rating");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleResetSort = () => {
    setSortingOption("");
    setFilterModalVisible(false);
    setPage(1);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBarInput}
          onChangeText={handleTextChange}
          value={gameSearch}
          placeholder="  Search games"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={games}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.flatListContainer}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              nextButton={<Text style={styles.button}>›</Text>}
              prevButton={<Text style={styles.button}>‹</Text>}
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
            >
              {item.short_screenshots.map((img) => {
                return (
                  <Image
                    key={img.id}
                    source={{ uri: img.image }}
                    style={styles.image}
                  />
                );
              })}
            </Swiper>

            {renderPlatforms({ platformdData: item })}
            <View style={styles.cardContent}>
              <Text style={styles.title}>
                {item.name}{" "}
                {item.rating > 4 ? "🎯" : item.rating > 3 ? "👍" : ""}
              </Text>

              <View style={styles.ratingBox}>
                <Text style={styles.ratingScore}>{item.rating}</Text>
                <Text style={styles.ratingCount}>+ {item.ratings_count}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.showGameButton}
              onPress={() =>
                navigation.navigate("PlatformsGame", { id: item.id })
              }
            >
              <Text style={styles.showGameButtonText}>See game details →</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={handleFilterClose}
        onSortByAToZ={handleSortByAToZ}
        onSortByZToA={handleSortByZToA}
        onSortByEarliest={handleSortByEarliest}
        onSortByMostRecent={handleSortByMostRecent}
        onSortByHighest={handleSortByHighest}
        onSortByLowest={handleSortByLowest}
        onResetSort={handleResetSort}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    paddingVertical: 10,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchBarInput: {
    color: "#FFF",
    borderColor: "#FFF",
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
    width: "70%",
  },
  flatListContainer: {
    paddingBottom: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#222",
    width: "90%",
    height: "auto", // add this line to adjust the card height based on its content
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: { height: 200 },
  image: {
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  dot: {
    backgroundColor: "#000",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  activeDot: {
    backgroundColor: "#FFF",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  cardContent: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 22,
    width: "80%",
    fontWeight: "bold",
    color: "#fff",
  },
  ratingScore: {
    backgroundColor: "white",
    fontSize: 20,
    overflow: "hidden",
    borderRadius: 5,
    padding: 5,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  ratingCount: {
    fontSize: 12,
    color: "white",
  },
  showGameButton: {
    width: "50%",
    paddingHorizontal: 8,
    paddingVertical: 5,
    // backgroundColor: "#FFF",
    // borderRadius: 5,
  },
  showGameButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  filterButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

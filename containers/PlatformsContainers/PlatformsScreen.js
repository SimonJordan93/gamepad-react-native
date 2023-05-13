import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";

// import { useWindowDimensions } from "react-native";

export default function PlatformsScreen() {
  const navigation = useNavigation();
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { height, width } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      // alert("Platforms was focused");
      const fetchPlatforms = async () => {
        try {
          const resPlatforms = await axios.get(
            `https://site--gamepad-back--6h6hqnm2zbqs.code.run/platforms`
          );

          setPlatforms(resPlatforms.data.results);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPlatforms();

      return () => {
        // alert("Platforms was unfocused");
        fetchPlatforms;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={platforms}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <View style={styles.card}>
              <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                source={{ uri: item.image_background }}
                style={styles.image}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("FilteredPlatformsGamesScreen", {
                      platformId: item.id,
                    })
                  }
                >
                  <Text style={styles.platformsTitle}>{item.name}</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          );
        }}
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
  flatListContainer: {
    paddingVertical: 30,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#222",
    width: "90%",
    height: "auto",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    aspectRatio: 16 / 9,
  },
  platformsTitle: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    // textDecorationLine: "underline",
  },
});

import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import ReviewSection from "../../components/ReviewSection";
import GameCard from "../../components/GameCard";

export default function StoresGameScreen({ route, userToken }) {
  const [game, setGame] = useState(null);
  const gameId = route.params.id;

  useFocusEffect(
    React.useCallback(() => {
      const fetchGame = async () => {
        try {
          const resGame = await axios.get(
            `https://site--gamepad-back--6h6hqnm2zbqs.code.run/game/${gameId}`
          );
          setGame(resGame.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGame();

      return () => {
        fetchGame;
      };
    }, [gameId])
  );

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: game.background_image }}
        style={styles.image}
      >
        <Text style={styles.title}>{game.name}</Text>
      </ImageBackground>
      <GameCard gameId={gameId} game={game} />
      <ReviewSection userToken={userToken} gameId={gameId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // flex: 1,
    aspectRatio: 16 / 9,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 30,
  },
  card: {
    backgroundColor: "#000",
    padding: 20,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 10,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  ratingCount: {
    padding: 5,
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  rating: {
    marginTop: 10,
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "white",
    borderRadius: 3,
    overflow: "hidden",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  metaLabel: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  metaValue: {
    color: "#fff",
    fontSize: 16,
    marginRight: 5,
  },
  link: {
    textDecorationLine: "underline",
  },
});

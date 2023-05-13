import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Header({ userToken, setUserToken }) {
  const [isActive, setIsActive] = useState("Games");

  const navigation = useNavigation();
  const route = useRoute();

  const handleBrowsePress = (screenName) => {
    navigation.navigate(`${screenName}${"StackNavigator"}`);
    setIsActive(screenName);
  };

  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <View style={styles.headerContainer}>
        {userToken ? (
          <View style={styles.headerBarIn}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/img/rawg-logo.png")}
                style={styles.logo}
              />
            </View>
            <TouchableOpacity
              style={styles.logSignButton}
              onPress={() => {
                setUserToken(null);
                navigation.navigate("GamesStackNavigator", { screen: "Games" });
              }}
            >
              <Text style={styles.logSignButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.logSignButton}
              onPress={() =>
                navigation.navigate("UserStackNavigator", { screen: "SignUp" })
              }
            >
              <Text style={styles.logSignButtonText}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/img/rawg-logo.png")}
                style={styles.logo}
              />
            </View>
            <TouchableOpacity
              style={styles.logSignButton}
              onPress={() =>
                navigation.navigate("UserStackNavigator", { screen: "SignIn" })
              }
            >
              <Text style={styles.logSignButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.browseButtons}>
          {"Games" === isActive ? (
            <TouchableOpacity
              style={[styles.browseBtn, styles.activeBrowseBtn]}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Games")}
            >
              <Text style={styles.browseBtnTitle}>Games</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.browseBtn}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Games")}
            >
              <Text style={styles.browseBtnTitle}>Games</Text>
            </TouchableOpacity>
          )}
          {"Platforms" === isActive ? (
            <TouchableOpacity
              style={[styles.browseBtn, styles.activeBrowseBtn]}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Platforms")}
            >
              <Text style={styles.browseBtnTitle}>Platforms</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.browseBtn}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Platforms")}
            >
              <Text style={styles.browseBtnTitle}>Platforms</Text>
            </TouchableOpacity>
          )}
          {"Genres" === isActive ? (
            <TouchableOpacity
              style={[styles.browseBtn, styles.activeBrowseBtn]}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Genres")}
            >
              <Text style={styles.browseBtnTitle}>Genres</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.browseBtn}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Genres")}
            >
              <Text style={styles.browseBtnTitle}>Genres</Text>
            </TouchableOpacity>
          )}
          {"Stores" === isActive ? (
            <TouchableOpacity
              style={[styles.browseBtn, styles.activeBrowseBtn]}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Stores")}
            >
              <Text style={styles.browseBtnTitle}>Stores</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.browseBtn}
              activeOpacity={0.6}
              onPress={() => handleBrowsePress("Stores")}
            >
              <Text style={styles.browseBtnTitle}>Stores</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  headerBarIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: "stretch",
  },
  logSignButton: {
    marginHorizontal: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
  logSignButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  browseButtons: {
    flexDirection: "row",
    height: 40,
  },
  browseBtn: {
    flex: 1,
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  activeBrowseBtn: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  browseBtnTitle: {
    color: "white",
    fontWeight: "bold",
  },
});

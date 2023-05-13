import React from "react";
import { View, StyleSheet, Image } from "react-native";

const renderPlatforms = ({ platformdData }) => {
  const supportedPlatforms = platformdData.parent_platforms;
  if (!supportedPlatforms) return null;
  return (
    <View style={styles.supportedPlatforms}>
      {supportedPlatforms.map((platform) => {
        // console.log(platform.platform.id);
        const platformId = platform.platform.id;
        if (platformId === 1) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/windows-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 2) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/playstation-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 3) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/xbox-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 4) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/ios-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 5) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/android-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 6) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/mac-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 7) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/linux-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 8) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/nintendo-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 9) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/atari-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 10) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/commodore-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 11) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/sega-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 12) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/3DO-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 13) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/neogeo-logo.png")}
              style={styles.platformLogos}
            />
          );
        }
        if (platformId === 14) {
          return (
            <Image
              key={platformId}
              source={require("../assets/img/www-logo.png")}
              style={styles.platformLogos}
            />
          );
        } else {
          return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  supportedPlatforms: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  platformLogos: {
    height: 20,
    width: 20,
    marginRight: 5,
    marginTop: 2,
  },
});

export default renderPlatforms;

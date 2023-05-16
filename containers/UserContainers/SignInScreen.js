import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

import userStore from "../../store";

const SignInScreen = () => {
  const setToken = userStore((state) => state.setToken);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields");
    } else {
      try {
        const response = await axios.post(
          "https://site--gamepad-back--6h6hqnm2zbqs.code.run/signin",
          {
            email,
            password,
          }
        );
        if (response.data.token) {
          setToken(response.data.token);
          Alert.alert("Success", "Sign in successful!");
          navigation.navigate("GamesStackNavigator");
        } else {
          Alert.alert("Error", "Sign in failed. Please try again.");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Sign in failed. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Text style={styles.screenTitle}>Sign in</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFF"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFF"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signInText}>
            No account? <Text style={styles.signInLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  screenTitle: {
    marginTop: 200,
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  formContainer: {
    // backgroundColor: "black",
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  input: {
    color: "white",
    width: "100%",
    height: 40,
    marginBottom: 20,
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 50,
    width: "50%",
    backgroundColor: "#FFF",
    borderColor: "#FFF",
    borderWidth: 3,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "700",
  },
  signInText: {
    textAlign: "center",
    marginTop: 20,
    color: "#FFF",
  },
  signInLink: {
    color: "#FFF",
    fontWeight: "700",
  },
});

export default SignInScreen;

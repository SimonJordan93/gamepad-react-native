import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

const SignUpScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all the fields");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      try {
        const response = await axios.post(
          "https://site--gamepad-back--6h6hqnm2zbqs.code.run/signup",
          {
            email,
            username,
            password,
            confirmPassword,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
          Alert.alert("Success", "Registration successful!");
          navigation.navigate("GamesStackNavigator");
        } else {
          Alert.alert("Error", "Registration failed. Please try again.");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Text style={styles.screenTitle}>Sign up</Text>
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
          placeholder="Username"
          placeholderTextColor="#FFF"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFF"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#FFF"
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text style={styles.signInLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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

export default SignUpScreen;

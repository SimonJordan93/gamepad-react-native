import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userStore = create((set) => ({
  userToken: null,
  setToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    set({ userToken: token });
  },
}));

export default userStore;

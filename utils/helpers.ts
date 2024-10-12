import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const showAlert = (
  success: boolean,
  message: string,
  customTitle: string = ""
) => {
  const title: string = customTitle || success ? "Success" : "Error";
  Alert.alert(title, message);
};

export const setDataInAsync = async (key: string, value: any) => {
  try {
    console.log(key, value);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing object:", e);
  }
};

export const getDataFromAsync = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error retrieving object:", e);
    return null;
  }
};

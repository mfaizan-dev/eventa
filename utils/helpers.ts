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

export const showConfirmationAlert = (
  title: string,
  message: string,
  onPressYes: any,
  onPressNo: any = undefined
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "No",
        onPress: onPressNo,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: onPressYes,
      },
    ],
    { cancelable: false }
  );
};

export const setDataInAsync = async (key: string, value: any) => {
  try {
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

export const getFormattedDate = (date: Date = new Date()): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate(); // Get the day (1-31)
  const month = months[date.getMonth()]; // Get the month name (0-indexed)
  const year = date.getFullYear(); // Get the full year (e.g., 2024)
  return `${month} ${day}, ${year}`;
};

export const formatDateString = (date: string) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};

export const isPastEvent = (eventDateStr: string): boolean => {
  try {
    const [datePart] = eventDateStr.split(" - ");
    const eventDate = new Date(datePart);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return eventDate < currentDate;
  } catch (e) {
    return false;
  }
};

export const isEventNear = (eventDateStr: string, daysLimit: number = 30) => {
  try {
    const eventDate = new Date(eventDateStr);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timeDifference = eventDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const isNear = daysDifference <= daysLimit && daysDifference >= 0;
    return isNear ? Math.floor(daysDifference) : -1;
  } catch (e) {
    return -1;
  }
};

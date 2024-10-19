import { ASYNC_FLAGS, COLORS } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDataFromAsync } from "@/utils/helpers";
import { useGlobalContext } from "@/context/globalContext";

const RootScreen = ({ navigation }: any) => {
  const [userData, setUserData] = useState(null);
  const { updateUserData } = useGlobalContext();

  useEffect(() => {
    (async () => {
      const user = await getDataFromAsync(ASYNC_FLAGS.user);
      setUserData(user);
    })();
  }, []);

  const onPressHandler = () => {
    if (userData) {
      updateUserData(userData);
      navigation.navigate("tabNavigation");
    } else {
      navigation.navigate("login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animated.Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animated.View style={styles.footer}>
        <Text style={styles.title}>Welcome to Eventa!</Text>
        <Text style={styles.text}>Celebrate Your Desired Events</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={onPressHandler}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Entypo name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default RootScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo + 10, // Adjust the size if needed
    height: height_logo + 10, // Make height the same as width for a circular shape
    borderRadius: (height_logo + 10) / 2, // This makes it circular
    marginTop: "-20%",
    overflow: "hidden", // Ensure the image is clipped to the circle,
    elevation: 10,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.secondaryLight,
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 50,
    marginTop: 40,
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    marginBottom: 2,
  },
});

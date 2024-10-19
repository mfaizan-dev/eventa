import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { APP_TITLE, COLORS } from "@/utils/constants";
import { BackHandler } from "react-native";

interface HeaderProps {
  title?: string;
  navigation: any;
  enableReload?: boolean;
  handleReload?: any;
  enableLogout?: boolean;
  handleLogout?: any;
  enableMenu?: boolean;
  handleMenu?: any;
  exitOnBack?: boolean;
}

const Header = ({
  title = APP_TITLE,
  navigation,
  enableReload = false,
  handleReload,
  enableLogout = false,
  handleLogout,
  enableMenu = false,
  handleMenu,
  exitOnBack = false,
}: HeaderProps) => {
  const handleBack = () => {
    if (exitOnBack) {
      BackHandler.exitApp();
      return;
    }
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.leftIcon}>
        <Ionicons name="arrow-back-outline" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          <Text style={styles.event}>event</Text>
          <Text style={styles.a}>a</Text>
        </Text>
      </View>

      {!enableLogout && !enableReload && !enableMenu && (
        <View style={styles.rightIcons} />
      )}

      {enableReload && (
        <TouchableOpacity onPress={handleReload} style={styles.icon}>
          <MaterialCommunityIcons
            name="reload"
            size={26}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}
      {enableLogout && (
        <TouchableOpacity onPress={handleLogout} style={styles.icon}>
          <MaterialCommunityIcons
            name="logout"
            size={26}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}
      {enableMenu && (
        <TouchableOpacity onPress={handleMenu} style={styles.icon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    paddingVertical: 15,
    width: "100%",
    marginTop: 0,
    paddingTop: 40,
    backgroundColor: "white",
    elevation: 3,
  },
  leftIcon: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    marginBottom: 2,
  },
  titleContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    color: "#FFFFFF",
    marginBottom: 0,
  },
  rightIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    marginBottom: 0,
  },
  event: {
    color: COLORS.primary,
    fontFamily: "Poppins-SemiBold", // Replace with your chosen font,
  },
  a: {
    color: COLORS.secondary,
    fontFamily: "Poppins-SemiBold", // Replace with your chosen font
  },
});

export default Header;

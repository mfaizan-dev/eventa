import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface GoogleLoginButtonProps {
  onPress: () => void;
  title?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onPress,
  title = "Sign in with Google",
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <AntDesign name="google" size={24} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB4437",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: 50,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default GoogleLoginButton;

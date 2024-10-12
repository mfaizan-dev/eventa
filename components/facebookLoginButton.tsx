import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface FacebookLoginButtonProps {
  onPress: () => void;
  title?: string;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onPress,
  title = "Sign in with Facebook",
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Entypo name="facebook" size={24} color="white" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b5998",
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

export default FacebookLoginButton;

import { COLORS } from "@/utils/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TextCard = ({ text }: { text: string }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TextCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 12,
    paddingVertical: 15,
    width: "auto",
    minWidth: "60%",
    alignSelf: "center",
    textAlign: "center",
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: COLORS.primary,
  },
});

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "@/utils/constants";

const EventCard = ({ event, onPress }: any) => {
  const { eventName, dateTime, location } = event;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          <FontAwesome
            name="map-marker"
            size={22}
            color="red"
            style={styles.marker}
          />
          <Text
            style={{ color: COLORS.secondary, marginTop: 0 }}
          >{`  ${location}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 12,
    paddingVertical: 18,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventName: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: COLORS.primary,
  },
  dateTime: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 0,
  },
  seatsAvailable: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  marker: {
    marginTop: 0,
  },
});

export default EventCard;

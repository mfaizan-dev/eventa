import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "@/utils/constants";
import { isEventNear } from "@/utils/helpers";

const AlertCard = ({ alert }: any) => {
  const { title, date, bookingDate } = alert;
  const daysLeft = isEventNear(date);
  let daysStr = "Today";
  if (daysLeft === 1) daysStr = "Tomorrow";
  else if (daysLeft > 1) {
    daysStr = `${daysLeft} days left`;
  }
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.eventName}>{title}</Text>
        <Text style={styles.dateTime}>{`Booked on ${bookingDate}`}</Text>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          <FontAwesome
            name="bell-o"
            size={22}
            color="red"
            style={styles.marker}
          />
          <Text
            style={{ color: COLORS.secondary, marginTop: 0 }}
          >{` ${daysStr}`}</Text>
        </View>
      </View>
    </View>
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

export default AlertCard;

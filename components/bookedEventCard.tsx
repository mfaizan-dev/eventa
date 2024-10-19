import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "@/utils/constants";
import { formatDateString } from "@/utils/helpers";

const BookedEventCard = ({ event, onCancelEvent }: any) => {
  const { eventName, dateTime, bookingDate } = event;
  const formattedDate = formatDateString(dateTime);
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.dateTime}>{`Booked on ${bookingDate}`}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
            <FontAwesome6
              name="clock"
              size={20}
              color="red"
              style={styles.marker}
            />
            <Text
              style={{ color: COLORS.secondary, marginTop: 0 }}
            >{` ${formattedDate}`}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cancel}
              onPress={onCancelEvent}
              activeOpacity={0.8}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  cancel: {
    paddingHorizontal: 12,
    backgroundColor: COLORS.secondaryLight,
    color: "white",
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 6,
    fontFamily: "Poppins",
    fontSize: 12,
  },
});

export default BookedEventCard;

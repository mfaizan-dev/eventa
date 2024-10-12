import Header from "@/components/header";
import { COLORS, IMAGE_PLACEHOLDER } from "@/utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const EventDetails = ({ navigation, route }: any) => {
  const { event = {} } = route?.params || {};
  const {
    id,
    eventName,
    dateTime,
    seatsAvailable,
    description,
    location,
    price,
    organizer,
    contactEmail,
    category,
    image,
    maxAttendees,
    duration,
  } = event;

  const [imageUrl, setImageUrl] = useState<string>(image || IMAGE_PLACEHOLDER);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Event Image */}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            onError={(e) => {
              setImageUrl(IMAGE_PLACEHOLDER);
            }}
          />

          {/* Event Title */}
          <Text style={styles.title}>{eventName}</Text>

          {/* Event Description (as part of the main view, not in a card) */}
          <Text style={styles.desc}>{description}</Text>

          {/* Event Location (as part of the main view, not in a card) */}
          <View style={styles.location}>
            <FontAwesome
              name="map-marker"
              size={24}
              color="red"
              style={styles.marker}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        {/* Scrollable section for the cards */}
        <View style={styles.cardsContainer}>
          {/* Event Date & Time */}
          <View style={styles.card}>
            <Text style={styles.cardText}>{dateTime}</Text>
          </View>

          {/* Price */}
          <View style={styles.card}>
            <Text style={styles.cardText}>${price}</Text>
          </View>

          {/* Organizer */}
          <View style={styles.card}>
            <Text style={styles.cardText}>{organizer}</Text>
          </View>

          {/* Contact Email */}
          <View style={styles.card}>
            <Text style={styles.cardText}>{contactEmail}</Text>
          </View>

          {/* Category */}
          <View style={styles.card}>
            <Text style={styles.cardText}>{category}</Text>
          </View>

          {/* Max Attendees */}
          <View style={styles.card}>
            <Text style={styles.cardText}>{maxAttendees}</Text>
          </View>

          {/* Event Duration */}
          <View style={styles.card}>
            <Text style={styles.cardText}>{duration} hours</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book Event Button */}
      <TouchableOpacity
        style={styles.bookButton}
        activeOpacity={0.8}
        onPress={() => {
          // Add your navigation logic for booking the event
          navigation.navigate("BookEvent", { eventId: id });
        }}
      >
        <Text style={styles.bookButtonText}>Book Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 12,
  },
  image: {
    width: "100%",
    height: 220,
    elevation: 10,
    borderRadius: 5,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
    fontSize: 20,
  },
  desc: {
    fontFamily: "Poppins",
    fontSize: 14,
    textAlign: "justify",
    color: COLORS.primary,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  marker: {
    marginRight: 5,
  },
  locationText: {
    color: COLORS.secondary,
    fontSize: 14,
  },
  cardsContainer: {
    paddingBottom: 20, // Ensure padding at the bottom for cards section
    paddingHorizontal: 12, // Add horizontal padding to match container padding
  },
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 3,
  },
  cardText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: COLORS.primary,
  },
  bookButton: {
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});

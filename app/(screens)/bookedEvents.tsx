import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { COLORS, RESPONSE_MESSAGES } from "@/utils/constants";
import Controller from "@/services/controller";
import TextCard from "@/components/textCard";
import { useGlobalContext } from "@/context/globalContext";
import BookedEventCard from "@/components/bookedEventCard";
import { showAlert, showConfirmationAlert } from "@/utils/helpers";
import Loader from "@/components/loader";

const BookedEventsScreen = ({ navigation }: any) => {
  const { userData } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    setLoading(true);
    const events = await Controller.fetchAllBookedEvents(userData?.email);
    setEvents(events);
    setLoading(false);
  };

  const confirmCancelEvent = async (bookingId: string) => {
    setDelLoading(true);
    const success = await Controller.deleteBooking(bookingId);
    showAlert(
      success,
      success
        ? RESPONSE_MESSAGES.bookingCancelSuccess
        : RESPONSE_MESSAGES.somethingWentWrong
    );
    setDelLoading(false);
    if (success) {
      await fetchEvents();
    }
  };

  const handleCancelEvent = (bookingId: string) => {
    showConfirmationAlert(
      "Cancel Confirmation",
      "Do you want to cancel this booking?",
      () => {
        confirmCancelEvent(bookingId);
      }
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Header
        navigation={navigation}
        enableReload={true}
        handleReload={fetchEvents}
      />
      <Loader visible={delLoading} />
      <TextInput
        style={styles.searchBar}
        placeholder={"Search Event"}
        onChangeText={setQuery}
      />
      {loading && (
        <ActivityIndicator style={{ marginTop: 15 }} color={COLORS.primary} />
      )}
      {!loading && events.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={events}
          renderItem={({ item }) => {
            if (
              item?.eventName?.toLowerCase()?.includes(query?.toLowerCase())
            ) {
              return (
                <BookedEventCard
                  event={item}
                  onCancelEvent={() => {
                    handleCancelEvent(item?.bookingId);
                  }}
                />
              );
            }
            return <></>;
          }}
        />
      )}
      {!loading && !events.length && <TextCard text="No Bookings Found!" />}
    </>
  );
};

export default BookedEventsScreen;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    marginHorizontal: 12,
    marginTop: 10,
    elevation: 3,
  },
});

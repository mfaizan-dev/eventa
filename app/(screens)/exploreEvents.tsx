import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import EventCard from "@/components/eventCard"; // Import EventCard component
import { COLORS, EventType } from "@/utils/constants";
import Controller from "@/services/controller";
import TextCard from "@/components/textCard";

const ExploreEventsScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<EventType[]>([]);

  const fetchEvents = async () => {
    setLoading(true);
    const events = await Controller.fetchAllEvents();
    setEvents(events);
    setLoading(false);
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
        exitOnBack={true}
      />
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
          style={{ marginTop: 5, marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
          data={events}
          renderItem={({ item }) => {
            if (
              item?.eventName?.toLowerCase()?.includes(query?.toLowerCase())
            ) {
              return (
                <EventCard
                  event={item}
                  onPress={() =>
                    navigation.navigate("eventDetails", { event: item })
                  }
                />
              );
            }
            return <></>;
          }}
        />
      )}
      {!loading && !events.length && <TextCard text="No Events Found!" />}
    </>
  );
};

export default ExploreEventsScreen;

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

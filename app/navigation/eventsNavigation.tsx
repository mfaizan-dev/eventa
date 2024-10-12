import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreEventsScreen from "../(screens)/exploreEvents";
import EventDetailsScreen from "../(screens)/eventDetails"; // Import your eventDetails screen

const Stack = createNativeStackNavigator();

export default function EventNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="exploreEvents" component={ExploreEventsScreen} />
      <Stack.Screen name="eventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}

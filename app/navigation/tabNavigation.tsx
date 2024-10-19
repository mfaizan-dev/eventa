import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "@/utils/constants";
import ExploreEventsScreen from "../(screens)/exploreEvents";
import EventNavigator from "./eventsNavigation";
import BookedEventsScreen from "../(screens)/bookedEvents";
import EventAlertsScreen from "../(screens)/eventAlerts";
import ProfileScreen from "../(screens)/profile";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }: any) => {
  const { targetTab = "" } = route?.params || {};

  useEffect(() => {
    if (targetTab) {
      navigation.navigate(targetTab);
    }
  }, [targetTab, navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
        tabBarLabelStyle: { fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name={"Explore Events"}
        component={EventNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="event"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Booked Events"}
        component={BookedEventsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="event-available"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Event Alerts"}
        component={EventAlertsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bell-o"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"My Profile"}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? COLORS.primary : COLORS.secondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

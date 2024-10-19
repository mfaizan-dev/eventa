import AlertCard from "@/components/alertCard";
import Header from "@/components/header";
import TextCard from "@/components/textCard";
import { useGlobalContext } from "@/context/globalContext";
import Controller from "@/services/controller";
import { COLORS } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const EventAlertsScreen = ({ navigation }: any) => {
  const {
    userData: { email = "" },
  } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<any[]>([]);

  const fetchAlerts = async () => {
    setLoading(true);
    const alerts = await Controller.fetchAllAlerts(email);
    setAlerts(alerts);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <>
      <Header
        navigation={navigation}
        enableReload={true}
        handleReload={fetchAlerts}
        exitOnBack={true}
      />
      {loading && (
        <ActivityIndicator style={{ marginTop: 15 }} color={COLORS.primary} />
      )}
      {!loading && alerts.length > 0 && (
        <ScrollView style={{ marginTop: 5, marginBottom: 10 }}>
          {alerts.map((alert) => (
            <AlertCard key={alert.title} alert={alert} />
          ))}
        </ScrollView>
      )}
      {!loading && !alerts.length && <TextCard text="No Alerts Found!" />}
    </>
  );
};

export default EventAlertsScreen;

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

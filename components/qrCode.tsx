import React from "react";
import { View, StyleSheet, Text, Modal, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { COLORS, TicketQRType } from "@/utils/constants"; // assuming it's in the specified path

const QRCodeGenerator = ({
  dataToEncode,
  visible,
  onClose,
}: {
  dataToEncode: TicketQRType;
  visible: boolean;
  onClose: () => void;
}) => {
  const { personName, eventName, eventDate, bookingDate, location } =
    dataToEncode;
  const valueToEncode = `
    Person Name: ${personName}
    Event Name: ${eventName}
    Event Date: ${eventDate}
    Booking Date: ${bookingDate}
    Event Venue: ${location}
  `;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.modalView}>
          <Text style={styles.message}>Event Booked Successfully</Text>
          <Text style={styles.message2}>Please save this QR Ticket</Text>

          <QRCode
            value={valueToEncode}
            size={200}
            color="black"
            backgroundColor="white"
          />

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // semi-transparent background
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  message2: {
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "semibold",
    color: COLORS.secondary,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default QRCodeGenerator;

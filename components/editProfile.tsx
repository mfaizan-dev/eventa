import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, UserType } from "@/utils/constants"; // Assuming COLORS is in the specified path

const EditProfile = ({
  visible,
  onClose,
  onSave,
  existingData,
}: {
  visible: boolean;
  onClose: any;
  onSave: any;
  existingData: UserType;
}) => {
  const [newName, setNewName] = useState(existingData.fullName);
  const [newContact, setNewContact] = useState(existingData.contact);

  // Update fields when the modal is opened and props change
  useEffect(() => {
    setNewName(existingData.fullName);
    setNewContact(existingData.contact);
  }, [existingData]);

  const handleSave = () => {
    const updatedData: UserType = {
      ...existingData,
      fullName: newName,
      contact: newContact,
    };
    onSave(updatedData);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Edit Profile</Text>

          <Text style={styles.label}>Enter New Name</Text>
          <TextInput
            style={styles.input}
            placeholder="New Name"
            value={newName}
            onChangeText={setNewName}
          />

          <Text style={styles.label}>Enter New Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="New Contact"
            value={newContact}
            onChangeText={setNewContact}
            keyboardType="phone-pad"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  buttonClose: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonSave: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default EditProfile;

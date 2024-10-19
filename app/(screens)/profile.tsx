import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Header from "@/components/header";
import { useGlobalContext } from "@/context/globalContext";
import { ASYNC_FLAGS, COLORS, UserType } from "@/utils/constants";
import Loader from "@/components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfile from "@/components/editProfile";
import Controller from "@/services/controller";
import { showAlert } from "@/utils/helpers";

const ProfileScreen = ({ navigation }: any) => {
  const { userData, updateUserData } = useGlobalContext();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = useCallback(() => {
    AsyncStorage.removeItem(ASYNC_FLAGS.user);
    setLoading(true);
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
      setLoading(false);
    }, 1000);
  }, [navigation]);

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const handleUpdateProfile = async (updatedData: UserType) => {
    setLoading(true);
    const { success, msg } = await Controller.updateProfile(updatedData);
    if (success) {
      updateUserData(updatedData);
    }
    setLoading(false);
    setIsEdit(false);
    showAlert(success, msg);
  };

  return (
    <>
      {/* Header */}
      <Header
        navigation={navigation}
        enableLogout={true}
        handleLogout={handleLogout}
      />
      <EditProfile
        onSave={handleUpdateProfile}
        existingData={userData}
        onClose={handleCloseEdit}
        visible={isEdit}
      />
      <Loader visible={loading} />
      <View style={styles.container}>
        {/* User Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/user-avatar.png")}
            style={styles.avatar}
          />
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{userData.fullName}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.userContact}>{userData.contact}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            setIsEdit(true);
          }}
        >
          <Text style={styles.logoutText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes it circular
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 0,
  },
  userName: {
    fontSize: 22,
    color: "#333",
    marginBottom: 10,
    fontFamily: "Poppins-SemiBold",
  },
  userEmail: {
    fontSize: 15,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  userContact: {
    fontSize: 15,
    fontFamily: "Poppins",
    color: "#666",
  },
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 3, // Shadow effect
    width: "45%", // Adjust width as necessary
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: COLORS.primary,
    fontSize: 15,
    fontFamily: "Poppins-SemiBold", // Make sure the font is properly linked
  },
});

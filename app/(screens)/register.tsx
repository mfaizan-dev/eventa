import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { showAlert } from "@/utils/helpers";
import { COLORS } from "@/utils/constants";
import Loader from "@/components/loader";
import Controller from "@/services/controller";

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    secureTextEntry: true,
    isValidFullName: true,
    isValidEmail: true,
    isValidContact: true,
    isValidPassword: true,
  });

  const handleFullNameChange = (val: string) => {
    const valid = /^[a-zA-Z\s]+$/.test(val);
    setData({
      ...data,
      fullName: val,
      isValidFullName: valid,
    });
  };

  const handleEmailChange = (val: string) => {
    const valid = /^\S+@\S+\.\S+$/.test(val);
    setData({
      ...data,
      email: val,
      isValidEmail: valid,
    });
  };

  const handleContactChange = (val: string) => {
    const valid = /^[0-9]{10,}$/.test(val); // Assuming contact has at least 10 digits
    setData({
      ...data,
      contact: val,
      isValidContact: valid,
    });
  };

  const handlePasswordChange = (val: string) => {
    const valid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
      val
    );
    setData({
      ...data,
      password: val,
      isValidPassword: valid,
    });
  };

  const updateSecureTextEntry = () => {
    setData((prevState) => ({
      ...prevState,
      secureTextEntry: !prevState.secureTextEntry,
    }));
  };

  const registerHandle = async () => {
    const {
      fullName,
      email,
      contact,
      password,
      isValidFullName,
      isValidEmail,
      isValidContact,
      isValidPassword,
    } = data;
    if (
      !isValidFullName ||
      !isValidEmail ||
      !isValidContact ||
      !isValidPassword
    ) {
      showAlert(false, "Please fill all fields correctly!");
      return;
    }
    setLoading(true);
    const { success, msg } = await Controller.registerUser({
      fullName,
      email,
      contact,
      password,
    });
    setLoading(false);
    showAlert(success, msg);
    if (success) {
      navigation.navigate("login");
    }
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Here!</Text>
      </View>
      <Animated.View style={[styles.footer, { backgroundColor: "white" }]}>
        <Text style={styles.text_footer}>Full Name</Text>
        <View style={styles.action}>
          <Feather
            name="user"
            color={COLORS.secondary}
            size={20}
            style={{ marginTop: 1 }}
          />
          <TextInput
            placeholder="Your Full Name"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={handleFullNameChange}
          />
        </View>
        {data.isValidFullName ? null : (
          <Animated.View>
            <Text style={styles.errorMsg}>Please enter a valid name</Text>
          </Animated.View>
        )}

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
        <View style={styles.action}>
          <Feather
            name="mail"
            color={COLORS.secondary}
            size={20}
            style={{ marginTop: 3 }}
          />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={handleEmailChange}
          />
        </View>
        {data.isValidEmail ? null : (
          <Animated.View>
            <Text style={styles.errorMsg}>Please enter a valid email</Text>
          </Animated.View>
        )}

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Contact</Text>
        <View style={styles.action}>
          <Feather name="phone" color={COLORS.secondary} size={20} />
          <TextInput
            placeholder="Your Contact Number"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={handleContactChange}
          />
        </View>
        {data.isValidContact ? null : (
          <Animated.View>
            <Text style={styles.errorMsg}>
              Please enter a valid contact number
            </Text>
          </Animated.View>
        )}

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color={COLORS.secondary}
            size={20}
            style={{ marginTop: 1 }}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            <Feather
              name={data.secureTextEntry ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animated.View>
            <Text style={styles.errorMsg}>
              Password must be at least 8 characters long, with 1 numeric and 1
              special character
            </Text>
          </Animated.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.Login, { backgroundColor: COLORS.primary }]}
            onPress={registerHandle}
            activeOpacity={0.8}
          >
            <Text style={styles.textSign}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={[styles.Login, styles.registerBtn]}
            activeOpacity={0.8}
          >
            <Text style={[styles.textSign, { color: COLORS.primary }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: COLORS.secondary,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: COLORS.secondary,
  },
  button: {
    alignItems: "center",
    marginTop: 40,
  },
  Login: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  registerBtn: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});

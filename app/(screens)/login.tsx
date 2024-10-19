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
import { CollectionsType, COLORS } from "@/utils/constants";
import GoogleLoginButton from "@/components/googleLoginButton";
import FacebookLoginButton from "@/components/facebookLoginButton";
import DBManager from "@/services/dbManager";
import Controller from "@/services/controller";
import Loader from "@/components/loader";
import { useGlobalContext } from "@/context/globalContext";

const LoginScreen = ({ navigation }: any) => {
  const { updateUserData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    secureTextEntry: true,
  });

  // Input Handlers
  const handleEmailChange = (val: string) => {
    setData({
      ...data,
      email: val,
    });
  };

  const handlePasswordChange = (val: string) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData((prevState) => ({
      ...prevState,
      secureTextEntry: !prevState.secureTextEntry,
    }));
  };

  const loginHandle = async () => {
    const { email, password } = data;
    if (!email || !password) {
      showAlert(false, "Please fill all fields correctly!");
      return;
    }
    setLoading(true);
    const userData = await Controller.loginUser(email, password);
    if (!userData) {
      showAlert(false, "Invalid credentials!");
    } else {
      updateUserData(userData);
      navigation.navigate("tabNavigation");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <View style={styles.header}>
        <Text style={styles.text_header}>Login Here!</Text>
      </View>
      <Animated.View style={[styles.footer, { backgroundColor: "white" }]}>
        <Text style={styles.text_footer}>Email</Text>
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

        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.Login, { backgroundColor: COLORS.primary }]}
            onPress={loginHandle}
            activeOpacity={0.8}
          >
            <Text style={styles.textSign}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("register")}
            style={[styles.Login, styles.registerBtn]}
            activeOpacity={0.8}
          >
            <Text style={[styles.textSign, { color: COLORS.primary }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

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
    flex: 2,
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
});

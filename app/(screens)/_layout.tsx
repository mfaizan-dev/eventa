import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootScreen from ".";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import TabNavigator from "../navigation/tabNavigation";

const Stack = createNativeStackNavigator();

export default function ScreensLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={RootScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="tabNavigation" component={TabNavigator} />
    </Stack.Navigator>
  );
}

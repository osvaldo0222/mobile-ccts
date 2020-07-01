import React, { useContext, useEffect } from "react";
import { Button, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { navigationRef } from "./src/navigationRef";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/** TEMP CODE */
const Home = () => {
  const { signout } = useContext(AuthContext);

  const temp = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }

    console.log(token);
  };

  useEffect(() => {
    temp();
  }, []);

  return <Button title="Logout" onPress={signout} />;
};

const LoginFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const AppNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const {
    state: { token, isLoading },
  } = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ header: () => null }}
          />
        ) : null}
        {token ? (
          <Stack.Screen name="AppFlow" component={AppNav} />
        ) : (
          <>
            <Stack.Screen
              name="LoginFlow"
              component={LoginFlow}
              options={{ header: () => null }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

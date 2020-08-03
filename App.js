import React, { useContext, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { navigationRef } from "./src/navigationRef";
import { secondaryColor, primaryColor, captionColor } from "./src/utils/Colors";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as StatisticsProvider } from "./src/context/StatisticsContext";
import { Provider as BleProvider } from "./src/context/BleContext";
import { Provider as VisitProvider } from "./src/context/VisitContext";
import { Provider as NotificationProvider } from "./src/context/NotificationContext";
import { Provider as HealthStatusProvider } from "./src/context/HealthStatusContext";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import LocalSignInScreen from "./src/screens/LocalSignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import { DrawerContent } from "./src/screens/DrawerContent";
import NotificationScreen from "./src/screens/NotificationScreen";
import VisitScreen from "./src/screens/VisitScreen";
import VisitShowScreen from "./src/screens/VisitShowScreen";
import HealthStatusScreen from "./src/screens/HealthStatusScreen";
import HealthStatusShowScreen from "./src/screens/HealthStatusShowScreen";
import NewHealthStatusScreen from "./src/screens/NewHealthStatusScreen";
import ExpositionScreen from "./src/screens/ExpositionScreen";
import InfectedScreen from "./src/screens/InfectedScreen";
import RecoveredScreen from "./src/screens/RecoveredScreen";
import DeathScreen from "./src/screens/DeathScreen";
import InfectedRecoveredScreen from "./src/screens/InfectedRecoveredScreen";

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    let experienceId = undefined;
    if (!Constants.manifest) {
      experienceId = "@osvaldo0222/MobileCCTS";
    }
    token = (await Notifications.getExpoPushTokenAsync({ experienceId })).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const LoginFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const StatisticsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Infected") {
            iconName = "ambulance";
          } else if (route.name === "Recovered") {
            iconName = "exit-run";
          } else if (route.name === "Deaths") {
            iconName = "emoticon-sad";
          } else if (route.name === "Active") {
            iconName = "axis-arrow";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: captionColor,
      }}
    >
      <Tab.Screen
        name="Infected"
        component={InfectedScreen}
        options={{ title: "Infectados" }}
      />
      <Tab.Screen
        name="Recovered"
        component={RecoveredScreen}
        options={{ title: "Recuperados" }}
      />
      <Tab.Screen
        name="Deaths"
        component={DeathScreen}
        options={{ title: "Defunciones" }}
      />
      <Tab.Screen
        name="Active"
        component={InfectedRecoveredScreen}
        options={{ title: "Activos" }}
      />
    </Tab.Navigator>
  );
};

const VisitNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="VisitsList"
        component={VisitScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Visit"
        component={VisitShowScreen}
        options={({ route }) => ({
          title: `Visita a ${route.params.item.locality.name}`,
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

const HealthReportNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="HealthStatusList"
        component={HealthStatusScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="HealthStatusView"
        component={HealthStatusShowScreen}
        options={({ route }) => ({
          title: `Reporte de salud ${route.params.item.id}`,
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

const HealthNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "MyReports") {
            iconName = "file-chart";
          } else if (route.name === "NewReport") {
            iconName = "folder-plus";
          } else if (route.name === "Exposition") {
            iconName = "account-group";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: captionColor,
      }}
    >
      <Tab.Screen
        name="MyReports"
        component={HealthReportNavigator}
        options={{ title: "Mis Reportes" }}
      />
      <Tab.Screen
        name="NewReport"
        component={NewHealthStatusScreen}
        options={{ title: "Nuevo Reporte" }}
      />
      <Tab.Screen
        name="Exposition"
        component={ExpositionScreen}
        options={{ title: "Exposición" }}
      />
    </Tab.Navigator>
  );
};

const AppNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Statistics" component={StatisticsNavigator} />
      <Drawer.Screen name="Visits" component={VisitNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="HealthStatus" component={HealthNavigator} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const {
    state: { token, notificationToken, isLoading },
    setNotificationToken,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    }
  }, [token]);

  useEffect(() => {
    if (!notificationToken) {
      registerForPushNotificationsAsync().then((notificationToken) => {
        setNotificationToken({ notificationToken });
      });
    }
  }, [notificationToken]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="LocalSignIn"
            component={LocalSignInScreen}
            options={{ header: () => null }}
          />
        ) : null}
        {token ? (
          <Stack.Screen
            name="AppFlow"
            component={AppNav}
            options={{ header: () => null }}
          />
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
      <StatisticsProvider>
        <HealthStatusProvider>
          <VisitProvider>
            <NotificationProvider>
              <BleProvider>
                <AuthProvider>
                  <App />
                  <StatusBar
                    hidden={false}
                    backgroundColor={secondaryColor}
                    barStyle="dark-content"
                    translucent={true}
                    animated={true}
                  />
                </AuthProvider>
              </BleProvider>
            </NotificationProvider>
          </VisitProvider>
        </HealthStatusProvider>
      </StatisticsProvider>
    </SafeAreaProvider>
  );
};

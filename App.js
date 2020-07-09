import React, { useContext, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { navigationRef } from './src/navigationRef';
import { secondaryColor } from './src/utils/Colors';
import {
	Provider as AuthProvider,
	Context as AuthContext,
} from './src/context/AuthContext';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LocalSignInScreen from './src/screens/LocalSignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import { DrawerContent } from './src/screens/DrawerContent';
import StatisticsComponent from './src/screens/Statistics';
import InfectedChart from './src/components/charts/InfectedChart';
import InfectedBySexGroupChart from './src/components/charts/InfectedBySexGroupChart';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

const registerForPushNotificationsAsync = async () => {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		let experienceId = undefined;
		if (!Constants.manifest) {
			experienceId = '@osvaldo0222/MobileCCTS';
		}
		token = (await Notifications.getExpoPushTokenAsync({ experienceId })).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
		<Drawer.Navigator
			drawerContent={(props) => <DrawerContent {...props} />}
			initialRouteName="Home"
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Statistics" component={StatisticsComponent} />
			<Drawer.Screen name="Infectados" component={InfectedChart} />
			<Drawer.Screen name="Recuperados" component={InfectedChart} />
			<Drawer.Screen name="Defunciones" component={InfectedChart} />
			<Drawer.Screen
				name="Infectados según género"
				component={InfectedBySexGroupChart}
			/>

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
		</SafeAreaProvider>
	);
};

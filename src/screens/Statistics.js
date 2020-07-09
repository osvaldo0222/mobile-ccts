import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContext } from '@react-navigation/native';

const list = [
	{
		title: 'Nuevos Contagios',
		icon: <Icon raised name="arrow-right" color="#f50" />,
		redirect: 'Infectados',
	},
	{
		title: 'Contagiados segun sexo',
		icon: <Icon raised name="arrow-right" color="#f50" />,
		redirect: 'Infectados según género',
	},
	{
		title: 'Recuperados',
		icon: <Icon raised name="arrow-right" color="#f50" />,
		redirect: 'Recuperados',
	},
	{
		title: 'Defunciones',
		icon: <Icon raised name="arrow-right" color="#f50" />,
		redirect: 'Defunciones',
	},
];

const StatisticsComponent = () => {
	const navigation = useContext(NavigationContext);
	return (
		<>
			<AppHeader title="Estadísticas" />
			<View>
				{list.map((item, i) => (
					<ListItem
						key={i}
						title={item.title}
						leftIcon={item.icon}
						bottomDivider
						chevron
						onPress={() => navigation.navigate(item.redirect)}
					/>
				))}
			</View>
		</>
	);
};

const styles = StyleSheet.create({});

export default StatisticsComponent;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import AppHeader from '../AppHeader';
import covid from '../../api/covid';
import Loading from '../Loading';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';

import CardComponent from './Card';

const chartConfig = {
	backgroundColor: '#e26a00',
	backgroundGradientFrom: '#FFFFFF',
	backgroundGradientTo: '#FFFFFF',
	decimalPlaces: 0, // optional, defaults to 2dp
	color: (opacity = 0.3) => `rgba(250, 103, 103, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(178, 178, 178, ${opacity})`,
	style: {},
	propsForDots: {
		r: '4',
		strokeWidth: '2',
		stroke: '#ffa726',
	},
};

const InfectedChart = (props) => {
	const [infected, setInfected] = useState('');
	const [data, setData] = useState([]);
	const [labels, setLabels] = useState([]);
	const [state, setState] = useState(false);
	const [newCases, setNewCases] = useState(0);
	let auxRoute = props.route.name;

	useEffect(() => {
		async function fetchData() {
			const response = await covid.get();
			let tempData = [];
			let tempLabels = [];

			method = function () {
				if (auxRoute === 'Infectados') {
					return tempData.push(response.data[key].Confirmed);
				} else if (auxRoute === 'Defunciones') {
					return tempData.push(response.data[key].Deaths);
				} else if (auxRoute === 'Recuperados') {
					return tempData.push(response.data[key].Recovered);
				}
			};

			for (var key in response.data) {
				method();
				tempLabels.push(response.data[key].Date.substring(8, 10));
			}

			setData(tempData);
			setLabels(tempLabels);
			let auxInfected = tempData[tempData.length - 1];
			setInfected(
				auxInfected.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
			);

			setNewCases(
				tempData[tempData.length - 1] - tempData[tempData.length - 2]
			);
			setState(true);
		}
		fetchData();
	}, []);

	function bootstrapChart() {
		return (
			<ScrollView>
				<AppHeader title={auxRoute} />
				<View style={styles.view}>
					<Text
						style={{
							padding: 10,
							fontSize: 20,
							color: '#000000',
							fontWeight: '500',
						}}
					>
						Consultar últimos datos{' '}
					</Text>
					<View style={styles.generalInfoView}>
						<Text style={styles.fromTo}>Desde </Text>
						<Text> Jun, 20</Text>
						<Text style={styles.fromTo}>Hasta </Text>
						<Text>Jun, 30</Text>
					</View>
					<View style={styles.shadow}>
						<View style={styles.buttonGroup}>
							<TouchableOpacity title="hello" style={styles.button}>
								<Text> 10 días</Text>
							</TouchableOpacity>
							<TouchableOpacity title="hello" style={[styles.button]}>
								<Text> 10 semanas</Text>
							</TouchableOpacity>
							<TouchableOpacity title="hello" style={styles.button}>
								<Text>6 meses</Text>
							</TouchableOpacity>
						</View>

						<LineChart
							data={{
								labels: labels,
								datasets: [
									{
										data: data,
									},
								],
							}}
							width={Dimensions.get('window').width - 20} // from react-native
							height={Dimensions.get('window').height / 2}
							yAxisInterval={2000} // optional, defaults to 1
							chartConfig={chartConfig}
							style={{
								marginVertical: 5,
							}}
							withInnerLines={false}
							bezier={false}
						/>
					</View>
					<CardComponent
						newest={newCases}
						total={infected}
						subject={
							auxRoute === 'Infectados'
								? 'Casos Nuevos'
								: auxRoute === 'Defunciones'
								? 'Nuevas muertes'
								: 'Recuperados Recientemente'
						}
						iconName={
							auxRoute === 'Infectados'
								? 'allergies'
								: auxRoute === 'Defunciones'
								? 'sad-tear'
								: 'running'
						}
					/>
				</View>
			</ScrollView>
		);
	}

	return <>{state ? bootstrapChart() : <Loading />}</>;
};

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		fontFamily: 'sans-serif',
		fontWeight: 'bold',
	},
	view: {
		alignItems: 'center',
		paddingTop: 10,
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 9,
	},
	card: {
		alignSelf: 'stretch',
		margin: 10,
		padding: 5,
		borderRadius: 10,
		height: '15%',
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardBody: {
		margin: 10,
	},
	cardText: {
		fontSize: 30,
	},
	icon: {
		fontSize: 30,
		paddingRight: 20,
	},
	generalInfoView: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	fromTo: {
		color: 'gray',
		marginLeft: 10,
	},
	infectedPercentage: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	infectedPercentageText: {
		fontSize: 24,
		color: '#F14D4D',
		marginLeft: 15,
	},
	subCardText: {
		fontSize: 12,
		color: 'gray',
	},
	button: {
		alignItems: 'center',
		padding: 10,
	},
	buttonGroup: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#FFFFFF',
	},
});

export default InfectedChart;

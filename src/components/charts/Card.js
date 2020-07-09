import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
const CardComponent = ({ subject, iconName, colorIcon, total, newest }) => {
	return (
		<View style={[styles.card, styles.shadow]}>
			<View style={styles.cardBody}>
				<Text style={styles.cardText}>{total}</Text>
				<Text style={styles.subCardText}>
					{subject} <AntDesign name="plus" size={12} color="red" />
					<Text style={{ color: 'red' }}>{newest}</Text>
				</Text>
			</View>
			<View>
				<FontAwesome5
					name={`${iconName}`}
					style={styles.icon}
					color="#F3AE2B"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
	subCardText: {
		fontSize: 12,
		color: 'gray',
	},
});

export default CardComponent;

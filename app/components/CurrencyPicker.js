import React, {PureComponent} from 'react';
import {Picker, StyleSheet} from 'react-native';
import {CURRENCIES} from '../Constants';

type TCurrencyPickerProps = {
	onCurrencySelected?: Function,
};

type TCurrencyPickerState = {
	currency: string,
};

export default class CurrencyPicker extends PureComponent {
	static defaultProps = {
		onCurrencySelected: (currency: string) => currency,
	};

	props: TCurrencyPickerProps;
	state: TCurrencyPickerState = {
		currency: CURRENCIES[0],
	};

	render() {
		return (
			<Picker
			  selectedValue={this.state.currency}
			  onValueChange={(itemValue, itemIndex) => {
			  	this.setState({
			  		currency: itemValue
			  	}, () => {
			  		this.props.onCurrencySelected(itemValue);
			  	});
			  }}
			  style={styles.picker}
			 >
			 {
			 	CURRENCIES.map(currency => {
			 		return (
			 			<Picker.Item label={currency} value={currency} key={`key_${currency}`}/>
			 		);
			 	})
			 }
			</Picker>
		);
	}

	getSelectedCurrency = () => this.state.currency;

}

const styles = StyleSheet.create({
	picker: {
		height: 40,
		width: 100,
		backgroundColor: '#F3F3F3',
	}
});

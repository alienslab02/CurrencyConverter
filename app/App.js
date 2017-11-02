import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import CurrencyPicker from './components/CurrencyPicker';
import {styles} from './App.styles';
import CurrencyConversionHelper from './helpers/CurrencyConversionHelper';

type TAppState = {
  currencyText: string,
  conversionText: string,
};

export default class App extends Component<{}> {
  state = {
    currencyText: '',
    conversionText: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Currency Converter
        </Text>
        <Text style={styles.instructions}>
          Choose currencies from dropdown. Enter desired amount in Text field and press 'Convert'.
        </Text>
        <View style={styles.app}>
          <View style={styles.pickerContainer}>
            {this.renderPicker('fromPicker', 'Base:')}
            {this.renderPicker('toPicker', 'Target:')}
          </View>
          <TextInput
            style={styles.input}       
            onChangeText={(currencyText) => this.setState({currencyText})}
            value={this.state.currencyText}
            keyboardType='numeric'
            placeholder='Enter base currency'
          />
          {this.state.conversionText !== '' &&
            <Text style={[styles.instructions, styles.conversionText]}>
              {this.state.conversionText}
            </Text>
          }
          <Button
            onPress={this.handleConvertion}
            title="Convert"
            color="#76A6EB"
            styles={styles.button}
          />
        </View>
        
      </View>
    );
  }

  renderPicker = (id: string, title: string) =>
    <View style={styles.picker}>
      <Text style={styles.instructions}>{title}</Text>
      <CurrencyPicker
        ref={(picker) => {this[id] = picker}}
      />
    </View>;

  handleConvertion = () => {
    if (this.validate()) {
      const data = {
        from: this.fromPicker.getSelectedCurrency(),
        to: this.toPicker.getSelectedCurrency(),
        value: Number(this.state.currencyText),
      };
      CurrencyConversionHelper.convert(
        data,
        (convertedValue) => {
          this.setState({
            conversionText: `${data.value} ${data.from} = ${convertedValue.toFixed(5)} ${data.to}`,
          });
        },
        (error) => {
          this.setState({
            conversionText: error,
          })
        }
      );
    }
  }

  validate = () => {
    const currncyFrom = this.fromPicker.getSelectedCurrency();
    const currncyTo = this.toPicker.getSelectedCurrency();
    const currencyValue = Number(this.state.currencyText);
    if (currncyTo === currncyFrom || currencyValue === 0) return false;
    return true;
  }

}


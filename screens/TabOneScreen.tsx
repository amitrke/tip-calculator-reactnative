import * as React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';

export default class TabOneScreen extends React.Component {

  public state: DataState;

  constructor(props: any) {
    super(props);

    this.state = {
      billAmount: 0,
      tipPct: 15,
      tipAmount: 0,
      totalAmount: 0,
      numberOfPeople: 1,
      eachPersonPays: 0
    }
  }

  private updateCalculations (inputState: DataState): DataState {
    const resultState = {... inputState};
    resultState.tipAmount = resultState.billAmount * resultState.tipPct / 100;
    resultState.totalAmount = resultState.billAmount + resultState.tipAmount;
    resultState.eachPersonPays = resultState.totalAmount / resultState.numberOfPeople;
    return resultState;
  }

  private updateBillAmount(amount: string) {
    const newState={... this.state};
    let input = parseFloat(amount);
    if (isNaN(input)) input = 0;
    if (input >= 0) {
      newState.billAmount = input;
      this.setState(this.updateCalculations(newState));
    }
  }

  private updateTipPct(tipPct: string) {
    const newState={... this.state};
    let input = parseFloat(tipPct);
    if (isNaN(input)) input = 0;
    if (input >= 0 && input <= 40) {
      newState.tipPct = input;
      this.setState(this.updateCalculations(newState));
    }
  }

  private updateNumPeople(numPeople: string) {
    const newState={... this.state};
    let input = parseInt(numPeople);
    if (isNaN(input)) input = 0;
    if (input >= 0 && input < 40) {
      newState.numberOfPeople = input;
      this.setState(this.updateCalculations(newState));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tip</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.rowContainer}>
          <View style={styles.labelCol}>
            <Text style={styles.strLabel}>Bill Amount</Text>
          </View>
          <View style={styles.inputCol}>
            <TextInput style={styles.strValue} keyboardType="number-pad" onChangeText={(text) => this.updateBillAmount(text)} value={String(this.state.billAmount)}></TextInput>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.labelCol}>
            <Text style={styles.strLabel}>Tip Percent</Text>
          </View>
          <View style={styles.inputCol}>
            <TextInput style={styles.strValue} keyboardType="number-pad" onChangeText={(text) => this.updateTipPct(text)} value={String(this.state.tipPct)}></TextInput>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.labelCol}>
            <Text style={styles.strLabel}>Tip Amount</Text>
          </View>
          <View style={styles.inputCol}>
          <Text style={styles.strValue}>{this.state.tipAmount}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.labelCol} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
            <Text style={styles.strLabel}>Total Amount</Text>
          </View>
          <View style={styles.inputCol} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
          <Text style={styles.strValue}>{this.state.totalAmount}</Text>
          </View>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Split</Text>
        <View style={styles.rowContainer}>
          <View style={styles.labelCol}>
            <Text style={styles.strLabel}>No. of People</Text>
          </View>
          <View style={styles.inputCol}>
            <TextInput style={styles.strValue} keyboardType="number-pad" defaultValue="1" onChangeText={(text) => this.updateNumPeople(text)} value={String(this.state.numberOfPeople)}></TextInput>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.labelCol}>
            <Text style={styles.strLabel}>Each Person Pays</Text>
          </View>
          <View style={styles.inputCol}>
          <Text style={styles.strValue}>{this.state.eachPersonPays}</Text>
          </View>
        </View>
      </View>
    );
  }

}

export type DataState = {
  billAmount: number;
  tipPct: number;
  tipAmount: number;
  totalAmount: number;
  numberOfPeople: number;
  eachPersonPays: number;
}

const screen = Dimensions.get("window");
const columnWidth = screen.width / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputCol: {
    width: columnWidth,
    borderWidth: 1
  },
  strLabel: {
    fontSize: 25
  },
  strValue: {
    fontSize: 25,
    textAlign: "right"
  },
  rowContainer: {
    flexDirection: "row",
    marginHorizontal: 50,
  },
  labelCol: {
    borderWidth: 1,
    width: columnWidth,
    alignItems: "flex-start"
  }
});

import { MaterialIcons } from '@expo/vector-icons';
import { Box, Center, Flex, Heading, HStack, Icon, Input, Text, VStack } from 'native-base';
import * as React from 'react';
import { Dimensions, Keyboard, StyleSheet, TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View } from '../components/Themed';

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

  private updateCalculations(inputState: DataState): DataState {
    const resultState = { ...inputState };
    resultState.tipAmount = resultState.billAmount * resultState.tipPct / 100;
    resultState.totalAmount = resultState.billAmount + resultState.tipAmount;
    resultState.eachPersonPays = resultState.totalAmount / resultState.numberOfPeople;
    return resultState;
  }

  private updateBillAmount(amount: string) {
    const newState = { ... this.state };
    let input = parseFloat(amount);
    if (isNaN(input)) input = 0;
    if (input >= 0) {
      newState.billAmount = input;
      this.setState(this.updateCalculations(newState));
    }
  }

  private updateTipPct(tipPct: string) {
    const newState = { ... this.state };
    let input = parseFloat(tipPct);
    if (isNaN(input)) input = 0;
    if (input >= 0 && input <= 40) {
      newState.tipPct = input;
      this.setState(this.updateCalculations(newState));
    }
  }

  private updateNumPeople(numPeople: string) {
    const newState = { ... this.state };
    let input = parseInt(numPeople);
    if (isNaN(input)) input = 0;
    if (input >= 0 && input < 40) {
      newState.numberOfPeople = input;
      this.setState(this.updateCalculations(newState));
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Center>
        <VStack space={4} alignItems="center" width={0.95} height="100%">
          <Heading size="md" margin={3}>
            Tip
          </Heading>

          <VStack space={4} alignItems="center">
            <HStack space={3}>
              <Center flex={1} rounded="lg" borderWidth="1px" borderColor="grey">
                <Text fontSize="lg" margin={1}>Bill Amount</Text>
                <Input 
                  margin={1}
                  variant="rounded"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="receipt-long" />}
                      size="md"
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  size="xl"
                  onChangeText={(text) => this.updateBillAmount(text)} 
                  value={String(this.state.billAmount)}
                />
              </Center>
              <Center flex={1} rounded="lg" borderWidth="1px" borderColor="grey">
                <Text fontSize="lg" margin={1}>Tip Percent</Text>
                <Input 
                  margin={1}
                  variant="rounded"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Text fontSize="3xl" bold={true} marginLeft={1}>%</Text>
                  }
                  placeholder="Input" // mx={4}
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  size="xl"
                  onChangeText={(text) => this.updateTipPct(text)} 
                  value={String(this.state.tipPct)}
                />
              </Center>
            </HStack>
            <HStack space={3}>
              <Center flex={1} rounded="lg" borderWidth="1px" borderColor="grey">
                <Text fontSize="lg" margin={1}>Tip Amount</Text>
                <Input 
                  margin={1}
                  variant="rounded"
                  isReadOnly={true}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="redeem" />}
                      size="md"
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  size="xl"
                  value={String(this.state.tipAmount)}
                />
              </Center>
              <Center flex={1} rounded="lg" borderWidth="1px" borderColor="grey">
                <Text fontSize="lg" margin={1}>Total Amount</Text>
                <Input 
                  margin={1}
                  variant="rounded"
                  isReadOnly={true}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="attach-money" />}
                      size="md"
                      m={2}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  placeholder="Input" // mx={4}
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  size="xl"
                  value={String(this.state.totalAmount)}
                />
              </Center>
            </HStack>
          </VStack>

          <Heading size="md" margin={3}>
            Split
          </Heading>

          <VStack space={4} alignItems="center">
            <HStack space={3}>
              <Center flex={1} rounded="lg" borderWidth="1px" borderColor="grey">
                <Text fontSize="lg" margin={1}>No. of People</Text>
                <Input
                  margin={1}
                  variant="rounded"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="people" />}
                      size="md"
                      m={2}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  placeholder="Input" // mx={4}
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  size="xl"
                  onChangeText={(text) => this.updateNumPeople(text)}
                  value={String(this.state.numberOfPeople)}
                />
              </Center>
              <Center flex={1} rounded="lg" borderWidth="1px" borderColor="grey">
                <Text fontSize="lg" margin={1}>Each Person Pays</Text>
                <Input
                  margin={1}
                  variant="rounded"
                  isReadOnly={true}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size="md"
                      m={2}
                      _light={{
                        color: "black",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  placeholder="Input" // mx={4}
                  _light={{
                    placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  size="xl"
                  value={String(this.state.eachPersonPays)}
                />
              </Center>
            </HStack>

          </VStack>

        </VStack>
      </Center>
      </TouchableWithoutFeedback>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    // borderColor: 'black',
    // borderWidth: 2,
    margin: 10
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
    borderWidth: 1,
    width: '50%',
    // borderColor: 'red'
  },
  strLabel: {
    fontSize: 25
  },
  strValue: {
    fontSize: 25,
    textAlign: "right"
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 50,
    width: '100%'
  },
  labelCol: {
    borderWidth: 1,
    width: '50%',
    alignItems: "flex-start"
  }
});

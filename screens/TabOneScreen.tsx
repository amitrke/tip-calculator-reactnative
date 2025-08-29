import React, { useState, useMemo } from 'react';
import { Keyboard } from 'react-native';
import {
  Heading,
  VStack,
  HStack,
  Input,
  InputField,
  Text,
  Box,
  Icon,
  Pressable
} from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabOneScreen() {
  const [billAmount, setBillAmount] = useState(0);
  const [tipPct, setTipPct] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleBillAmountChange = (text: string) => {
    const value = parseFloat(text);
    setBillAmount(isNaN(value) ? 0 : value);
  };

  const handleTipPctChange = (text: string) => {
    const value = parseFloat(text);
    setTipPct(isNaN(value) ? 0 : value);
  };

  const handleNumberOfPeopleChange = (text: string) => {
    const value = parseInt(text, 10);
    setNumberOfPeople(isNaN(value) ? 1 : value);
  };

  const { tipAmount, totalAmount, eachPersonPays } = useMemo(() => {
    const tip = billAmount * (tipPct / 100);
    const total = billAmount + tip;
    const perPerson = numberOfPeople >= 1 ? total / numberOfPeople : 0;
    return {
      tipAmount: tip.toFixed(2),
      totalAmount: total.toFixed(2),
      eachPersonPays: perPerson.toFixed(2),
    };
  }, [billAmount, tipPct, numberOfPeople]);

  return (
    <Pressable onPress={Keyboard.dismiss} flex={1}>
      <Box p="$4" flex={1}>
        <VStack style={{ gap: 10 }}>
          <Heading>Tip</Heading>
          <HStack style={{ gap: 10 }}>
            <VStack flex={1} style={{ gap: 5 }}>
              <Text>Bill Amount</Text>
              <Input size="md">
                <InputField
                  keyboardType="numeric"
                  value={String(billAmount)}
                  onChangeText={handleBillAmountChange}
                  placeholder="0.00"
                />
              </Input>
            </VStack>
            <VStack flex={1} style={{ gap: 5 }}>
              <Text>Tip Percent</Text>
              <Input size="md">
                <InputField
                  keyboardType="numeric"
                  value={String(tipPct)}
                  onChangeText={handleTipPctChange}
                  placeholder="15"
                />
              </Input>
            </VStack>
          </HStack>
          <HStack style={{ gap: 10 }}>
            <VStack flex={1} style={{ gap: 5 }}>
              <Text>Tip Amount</Text>
              <Input isReadOnly size="md">
                <InputField value={String(tipAmount)} />
              </Input>
            </VStack>
            <VStack flex={1} style={{ gap: 5 }}>
              <Text>Total Amount</Text>
              <Input isReadOnly size="md">
                <InputField value={String(totalAmount)} />
              </Input>
            </VStack>
          </HStack>

          <Heading mt="$4">Split</Heading>
          <HStack style={{ gap: 10 }}>
            <VStack flex={1} style={{ gap: 5 }}>
              <Text>No. of People</Text>
              <Input size="md">
                <InputField
                  keyboardType="numeric"
                  value={String(numberOfPeople)}
                  onChangeText={handleNumberOfPeopleChange}
                  placeholder="1"
                />
              </Input>
            </VStack>
            <VStack flex={1} style={{ gap: 5 }}>
              <Text>Each Person Pays</Text>
              <Input isReadOnly size="md">
                <InputField value={String(eachPersonPays)} />
              </Input>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
}

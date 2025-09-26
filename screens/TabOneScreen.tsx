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
  Pressable,
  Button,
  ButtonText,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Icon,
  Divider,
  ScrollView,
} from '@gluestack-ui/themed';
import { Plus, Minus, RotateCw } from 'lucide-react-native';

const TIP_PERCENTAGES = [10, 15, 20, 25];

export default function TabOneScreen() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPct, setTipPct] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const bill = parseFloat(billAmount) || 0;

  const handleReset = () => {
    setBillAmount('');
    setTipPct(15);
    setNumberOfPeople(1);
    Keyboard.dismiss();
  };

  const { tipAmount, totalAmount, eachPersonPays } = useMemo(() => {
    const tip = bill * (tipPct / 100);
    const total = bill + tip;
    const perPerson = numberOfPeople > 0 ? total / numberOfPeople : 0;
    return {
      tipAmount: tip.toFixed(2),
      totalAmount: total.toFixed(2),
      eachPersonPays: perPerson.toFixed(2),
    };
  }, [bill, tipPct, numberOfPeople]);

  return (
    <ScrollView
      p="$4"
      flex={1}
      bg="$backgroundLight50"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <VStack space="md">
        {/* Bill and Tip Card */}
        <Box bg="$backgroundLight0" p="$4" borderRadius="$lg">
          <VStack space="lg">
            <HStack justifyContent="space-between" alignItems="center">
              <Heading>Bill & Tip</Heading>
              <Button variant="link" onPress={handleReset}>
                <Icon as={RotateCw} />
              </Button>
            </HStack>

            <VStack space="xs">
              <Text>Bill Amount</Text>
              <Input>
                <InputField
                  keyboardType="numeric"
                  value={billAmount}
                  onChangeText={setBillAmount}
                  placeholder="0.00"
                  fontSize="$lg"
                  accessibilityLabel="Bill Amount"
                />
              </Input>
            </VStack>

            <VStack space="sm">
              <Text>Select Tip %</Text>
              <HStack space="sm" justifyContent="space-between">
                {TIP_PERCENTAGES.map((pct) => (
                  <Button
                    key={pct}
                    variant={tipPct === pct ? 'solid' : 'outline'}
                    onPress={() => setTipPct(pct)}
                    flex={1}
                    accessibilityLabel={`${pct}%`}
                  >
                    <ButtonText size="sm" color={tipPct === pct ? '$white' : undefined}>{pct}%</ButtonText>
                  </Button>
                ))}
              </HStack>
              <Slider
                value={tipPct}
                minValue={0}
                maxValue={50}
                onChange={(value: number) => setTipPct(Math.round(value))}
                step={1}
                mt="$2"
              >
                <SliderTrack style={{ height: 8, backgroundColor: '#E0E0E0' }}>
                  <SliderFilledTrack style={{ backgroundColor: '#3B82F6' }} />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text textAlign="center" mt="$1">
                {tipPct}%
              </Text>
            </VStack>

            <Divider my="$2" />

            <HStack justifyContent="space-between">
              <VStack>
                <Text>Tip Amount</Text>
                <Heading>${tipAmount}</Heading>
              </VStack>
              <VStack alignItems="flex-end">
                <Text>Total Amount</Text>
                <Heading>${totalAmount}</Heading>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        {/* Split Card */}
        <Box bg="$backgroundLight0" p="$4" borderRadius="$lg">
          <VStack space="lg">
            <Heading>Split</Heading>
            <HStack justifyContent="space-between" alignItems="center">
              <Text size="xl">No. of People</Text>
              <HStack space="md" alignItems="center">
                <Button
                  size="lg"
                  onPress={() => setNumberOfPeople((n) => Math.max(1, n - 1))}
                  isDisabled={numberOfPeople <= 1}
                  accessibilityLabel="Minus"
                >
                  <Icon as={Minus} />
                </Button>
                <Text size="xl" w="$12" textAlign="center">
                  {numberOfPeople}
                </Text>
                <Button size="lg" onPress={() => setNumberOfPeople((n) => n + 1)} accessibilityLabel="Plus">
                  <Icon as={Plus} />
                </Button>
              </HStack>
            </HStack>
            <Divider my="$2" />
            <HStack justifyContent="space-between" alignItems="center">
              <Text size="xl">Each Person Pays</Text>
              <Heading>${eachPersonPays}</Heading>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}

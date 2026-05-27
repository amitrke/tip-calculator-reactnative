import React from 'react';
import {
  Heading,

  Text,
  VStack,
  Box,
  Divider,
  ScrollView,
} from '@gluestack-ui/themed';
import { useTextScale } from '../components/TextScaleContext';

const TippingInfo = ({
  title,
  text,
  scale,
}: {
  title?: string;
  text: string;
  scale: (fontSize: number) => number;
}) => (
  <VStack space="sm">
    {title && <Heading size="md" style={{ fontSize: scale(22) }}>{title}</Heading>}
    <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>{text}</Text>
  </VStack>
);

const tippingData = [
  {
    text: "Tipping is usually done on the post-tax amount, but technically, there's nothing wrong with tipping on the pre-tax amount. It all comes down to the kind of service you received."
  },
  {
    title: "United States",
    text: "Standard tipping amounts on average usually range from 15% to 20%, with anything above 20% indicating excellent service."
  },
  {
    title: "United Kingdom",
    text: "If a service charge isn't included in your bill, add 10% to 15%."
  },
  {
    title: "Australia",
    text: "Tips aren't expected in restaurants or for taxi rides but if you are happy with your service you can round up."
  }
];

export default function TabTwoScreen() {
  const { scale } = useTextScale();

  return (
    <ScrollView p="$4" flex={1}>
      <VStack space="lg">
        {tippingData.map((item, index) => (
          <React.Fragment key={index}>
            <TippingInfo title={item.title} text={item.text} scale={scale} />
            {index < tippingData.length - 1 && <Divider my="$2" />}
          </React.Fragment>
        ))}
      </VStack>
    </ScrollView>
  );
}

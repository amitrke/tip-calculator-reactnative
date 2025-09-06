import React from 'react';
import { ScrollView } from 'react-native';
import {
  VStack,
  Heading,
  Text,
  Box,
} from '@gluestack-ui/themed';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box p="$4" bg="$backgroundLight50">
        <VStack space="lg">
          <Heading size="2xl" textAlign="center">Privacy Policy</Heading>
          
          <Text textAlign="center" color="$textLight600">
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <VStack space="md">
            <Heading size="lg">Introduction</Heading>
            <Text>
              This Privacy Policy describes how Tip Calculator ("we", "our", or "us") handles your information when you use our mobile application (the "Service").
            </Text>
            <Text>
              We are committed to protecting your privacy. This app is designed to work completely offline and does not collect, store, or transmit any personal information.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg">Information We Don't Collect</Heading>
            <Text>
              Our app does NOT collect, store, or transmit any of the following:
            </Text>
            <VStack space="xs" ml="$4">
              <Text>• Personal identification information</Text>
              <Text>• Financial information or transaction data</Text>
              <Text>• Location data</Text>
              <Text>• Device information</Text>
              <Text>• Usage analytics</Text>
              <Text>• Crash reports</Text>
              <Text>• Any other personal data</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="lg">How the App Works</Heading>
            <Text>
              The Tip Calculator app works entirely on your device. All calculations are performed locally, and no data is sent to external servers or third parties. The app functions completely offline.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg">Data Storage</Heading>
            <Text>
              The app does not store any calculation history or personal data. Each time you use the app, you start with a clean slate. No information persists between app sessions.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg">Third-Party Services</Heading>
            <Text>
              This app does not integrate with any third-party services, analytics platforms, or advertising networks. No external libraries that collect data are used.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg">Children's Privacy</Heading>
            <Text>
              Our app is safe for users of all ages. Since we don't collect any information, there are no privacy concerns for children under 13 or any other age group.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg">Changes to This Privacy Policy</Heading>
            <Text>
              We may update our Privacy Policy from time to time. Any changes will be reflected by updating the "Last updated" date at the top of this Privacy Policy.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg">Contact Us</Heading>
            <Text>
              If you have any questions about this Privacy Policy, please create an issue at:
            </Text>
            <Text>
              https://github.com/amitrke/tip-calculator-reactnative/issues
            </Text>
          </VStack>

          <Box h="$8" />
        </VStack>
      </Box>
    </ScrollView>
  );
}

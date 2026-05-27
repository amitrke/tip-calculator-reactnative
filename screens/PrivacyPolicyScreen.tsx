import React from 'react';
import { ScrollView } from 'react-native';
import {
  VStack,
  Heading,
  Text,
  Box,
} from '@gluestack-ui/themed';
import { useTextScale } from '../components/TextScaleContext';

export default function PrivacyPolicyScreen() {
  const { scale } = useTextScale();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box p="$4" bg="$backgroundLight50">
        <VStack space="lg">
          <Heading size="2xl" textAlign="center" style={{ fontSize: scale(32) }}>Privacy Policy</Heading>
          
          <Text textAlign="center" color="$textLight600" style={{ fontSize: scale(14) }}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Introduction</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              This Privacy Policy describes how Tip Calculator ("we", "our", or "us") handles your information when you use our mobile application (the "Service").
            </Text>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              We are committed to protecting your privacy. This app is designed to work completely offline and does not collect, store, or transmit any personal information.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Information We Don't Collect</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              Our app does NOT collect, store, or transmit any of the following:
            </Text>
            <VStack space="xs" ml="$4">
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Personal identification information</Text>
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Financial information or transaction data</Text>
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Location data</Text>
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Device information</Text>
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Usage analytics</Text>
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Crash reports</Text>
              <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>• Any other personal data</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>How the App Works</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              The Tip Calculator app works entirely on your device. All calculations are performed locally, and no data is sent to external servers or third parties. The app functions completely offline.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Data Storage</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              The app does not store any calculation history or personal data. Each time you use the app, you start with a clean slate. No information persists between app sessions.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Third-Party Services</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              This app does not integrate with any third-party services, analytics platforms, or advertising networks. No external libraries that collect data are used.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Children's Privacy</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              Our app is safe for users of all ages. Since we don't collect any information, there are no privacy concerns for children under 13 or any other age group.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Changes to This Privacy Policy</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              We may update our Privacy Policy from time to time. Any changes will be reflected by updating the "Last updated" date at the top of this Privacy Policy.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="lg" style={{ fontSize: scale(24) }}>Contact Us</Heading>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              If you have any questions about this Privacy Policy, please create an issue at:
            </Text>
            <Text style={{ fontSize: scale(16), lineHeight: scale(24) }}>
              https://github.com/amitrke/tip-calculator-reactnative/issues
            </Text>
          </VStack>

          <Box h="$8" />
        </VStack>
      </Box>
    </ScrollView>
  );
}

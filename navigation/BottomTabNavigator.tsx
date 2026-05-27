import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import { useTextScale } from '../components/TextScaleContext';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { scale } = useTextScale();

  return (
    <BottomTab.Navigator
      initialRouteName="Calculator"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: scale(12),
        },
      }}
    >
      <BottomTab.Screen
        name="Calculator"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="calculator" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Etiquette"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Privacy"
        component={PrivacyNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="shield-checkmark" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  const { scale } = useTextScale();

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Calculator', headerTitleStyle: { fontSize: scale(20) } }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  const { scale } = useTextScale();

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tipping Etiquette', headerTitleStyle: { fontSize: scale(20) } }}
      />
    </TabTwoStack.Navigator>
  );
}

const PrivacyStack = createStackNavigator();

function PrivacyNavigator() {
  const { scale } = useTextScale();

  return (
    <PrivacyStack.Navigator>
      <PrivacyStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ headerTitle: 'Privacy Policy', headerTitleStyle: { fontSize: scale(20) } }}
      />
    </PrivacyStack.Navigator>
  );
}

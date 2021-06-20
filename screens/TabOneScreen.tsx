import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TipRow from '../components/TipRow';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tip</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TipRow str="Bill Amount" readOnly ></TipRow>
      <TipRow str="Tip Percent" readOnly></TipRow>
      <TipRow str="Tip Amount" readOnly></TipRow>
      <TipRow str="Total Amount" readOnly></TipRow>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Split</Text>
      <TipRow str="No. of People" readOnly></TipRow>
      <TipRow str="Each Person Pays" readOnly></TipRow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

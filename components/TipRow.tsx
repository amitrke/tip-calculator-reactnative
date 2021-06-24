import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput } from 'react-native';

export default function TipRow({ str, readOnly, onUpdate, state }: { str: string, readOnly: boolean, onUpdate:any, state: any }) {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.labelCol}>
                <Text style={styles.strLabel}>{str}</Text>
            </View>
            <View style={styles.inputCol}>
                <TextInput style={styles.strValue} keyboardType="number-pad" onChangeText={testA} ></TextInput>
            </View>
        </View>
    );
}

function testA() {
    console.log("Hello");
}

const screen = Dimensions.get("window");
const columnWidth = screen.width / 2;

const styles = StyleSheet.create({
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
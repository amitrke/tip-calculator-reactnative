import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput } from 'react-native';

export default function TipRow({ str, readOnly }: { str: string, readOnly: boolean }) {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.labelCol}>
                <Text style={styles.strLabel}>{str}</Text>
            </View>
            <View style={styles.inputCol}>
                <TextInput style={styles.strValue} keyboardType="number-pad"></TextInput>
            </View>
        </View>
    );
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
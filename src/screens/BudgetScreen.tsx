import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View                              
} from "react-native";
import colors from '../assets/colors.ts';

function BudgetScreen(): React.JSX.Element {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Budget Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: colors.secondary
    },
    text: {
        textAlign: 'center'
    }
});

export default BudgetScreen;
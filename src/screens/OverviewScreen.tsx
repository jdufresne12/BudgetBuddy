import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View                              
} from "react-native";
import colors from '../assets/colors.ts'

function OverviewScreen(): React.JSX.Element {

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <Text>
                    Overview Screen
                </Text>
            </View>
            <View style={styles.budgetContainer}>
                <Text>
                    Overview Screen
                </Text>
            </View>

     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: colors.secondary
    },
    tabContainer: {
        flexDirection: 'row',
        height: '25%',
        backgroundColor: colors.primary
    },
    budgetContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center'
    }
});

export default OverviewScreen
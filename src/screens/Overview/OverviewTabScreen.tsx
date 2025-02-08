import React, { useEffect, useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { colors } from '../../assets/theme.ts'
import OveriewScreenTabs from "../../components/OverviewScreenTabs.tsx";
import OverviewScreen from "../Overview/OverviewScreen.tsx";
import TransactionScreen from "../Overview/TransactionScreen.tsx";

function OverviewTabScreen(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

    return (

        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: colors.secondary }}
        >
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    <OveriewScreenTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </View>
                {activeTab === "overview"
                    ? (<OverviewScreen />)
                    : (<TransactionScreen />)
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
    },
    tabContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        height: 500,
        backgroundColor: colors.primary,
        marginTop: -350,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default OverviewTabScreen
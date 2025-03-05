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
import AddTransaction from "../../components/AddTransaction.tsx";

function OverviewTabScreen(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

    return (
        <View style={styles.mainContainer}>
            <ScrollView
                style={styles.scrollView}
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
                {/* Add padding at the bottom to prevent content from being hidden behind the button */}
                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Fixed Add Transaction button */}
            <View style={styles.fixedButtonContainer}>
                <AddTransaction />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContentContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
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
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 30,
    },
    bottomPadding: {
        height: 100,
    },
});

export default OverviewTabScreen
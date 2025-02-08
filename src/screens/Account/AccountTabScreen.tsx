import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { colors, typography } from '../../assets/theme.ts';
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLoading } from "../../contexts/LoadingContext.tsx";

function AccountTabScreen(): React.JSX.Element {
    const { logout: contextLogout } = useAuth();
    const { setIsLoading } = useLoading();

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await contextLogout();
        } catch {
            console.log('Failed to logout')
        }
        setIsLoading(false);
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleSignOut}
        >
            <Text style={styles.text}>
                Account Screen / SIGNOUT
            </Text>
        </TouchableOpacity>
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

export default AccountTabScreen;
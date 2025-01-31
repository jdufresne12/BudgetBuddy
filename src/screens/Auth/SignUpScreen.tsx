import React, {useEffect, useState} from "react";
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

function SignUpScreen(): React.JSX.Element {
    const navigation = useNavigation<AuthNavigationProp>();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        marginTop: 100
    }
});

export default SignUpScreen; 
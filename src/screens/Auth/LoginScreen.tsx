import React, { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, typography } from '../../assets/theme';
import Icon from '@react-native-vector-icons/ionicons';

type AuthNavigationProp = NativeStackNavigationProp<
    AuthStackParamList,
    'Login'
>;

const LoginScreen = () => {
    const navigation = useNavigation<AuthNavigationProp>();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLoginPress = () => {
        /*
            STEP 1: Validate Username and Password
            STEP 2: Call login api
            STEP 3: Obtain response, determine if successful or not 
        */
        console.log('username', username)
        console.log('password', password)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={() => navigation.navigate('Welcome')}
            >
                <Icon name="arrow-back-outline" size={40} color={colors.white} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Icon name="logo-bitcoin" size={125} color={colors.primary} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.tagline}>Let's get to budgeting</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Icon
                        name="person-outline"
                        size={20}
                        color={colors.inactive}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name="lock-closed-outline"
                        size={20}
                        color={colors.inactive}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}>
                        <Icon
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color={colors.inactive}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLoginPress}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => console.log('- NEED TO IMPLEMENT FORGOT PASSWORD -')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    logoContainer: {
        marginTop: 30,
        width: 175,
        height: 175,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 125,
        backgroundColor: colors.secondary,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.9,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    backButtonContainer: {
        marginTop: 70,
        marginLeft: 25,
        alignSelf: 'baseline',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    welcomeText: {
        marginTop: 100,
        marginBottom: 5,
        letterSpacing: 0.5,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.moneyLarge,
        color: colors.white,
    },
    tagline: {
        marginTop: 5,
        marginBottom: 5,
        letterSpacing: 0.2,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.body,
        color: colors.white,
    },
    buttonContainer: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 30,
        gap: 10,
    },
    loginButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 15,
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    signupButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        alignItems: 'center',
        marginTop: 15,
    },
    forgotPasswordText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default LoginScreen;

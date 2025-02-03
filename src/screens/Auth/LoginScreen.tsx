import React, { useEffect, useState } from 'react';
import {
    Alert,
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
import { authApi } from '../../api/services/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';

type AuthNavigationProp = NativeStackNavigationProp<
    AuthStackParamList,
    'Login'
>;

const LoginScreen = () => {
    const { setIsLoading } = useLoading();
    const navigation = useNavigation<AuthNavigationProp>();

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { login: contextLogin } = useAuth();

    const handleLoginPress = async () => {
        let isValid = true;
        setEmailError(false);
        setPasswordError(false);

        if (email.trim() === '') {
            setEmailError(true);
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError(true);
            isValid = false;
        }

        if (!isValid) return
        try {
            setIsLoading(true);
            const response = await authApi.login({ email, password });
            console.log("here")
            await contextLogin(response.access_token, response.user_data);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Please check your credentials and try again';

            Alert.alert(
                'Login Failed',
                errorMessage
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-outline" size={40} color={colors.primary} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Icon name="logo-bitcoin" size={125} color={colors.secondary} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.tagline}>Let's get to budgeting</Text>
            </View>

            <View style={styles.formContainer}>
                <View
                    style={[
                        styles.inputContainer,
                        emailError ? { borderColor: colors.error_red } : null
                    ]}
                >
                    <Icon
                        name="person-outline"
                        size={20}
                        color={colors.inactive}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <View
                    style={[
                        styles.inputContainer,
                        passwordError ? { borderColor: colors.error_red } : null
                    ]}
                >
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
        backgroundColor: colors.secondary,
    },
    logoContainer: {
        marginTop: 12,
        width: 175,
        height: 175,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 125,
        backgroundColor: colors.primary,
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
        marginTop: 90,
        marginBottom: 5,
        letterSpacing: 0.5,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.moneyLarge,
        color: colors.primary,
    },
    tagline: {
        marginBottom: 5,
        letterSpacing: 0.2,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.regular,
        fontSize: typography.sizes.title,
        color: colors.primary,
    },
    buttonContainer: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 30,
        gap: 10,
    },
    loginButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.white,
    },
    loginButtonText: {
        color: colors.white,
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
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.white,
        backgroundColor: colors.white,
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
        borderColor: colors.white,
    },
    signupButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        alignItems: 'center',
        marginTop: 15,
    },
    forgotPasswordText: {
        color: colors.inactive,
        fontSize: 14,
    },
});

export default LoginScreen;

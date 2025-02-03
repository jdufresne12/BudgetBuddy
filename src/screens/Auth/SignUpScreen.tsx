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
import { userApi } from '../../api/services/user';
import { authApi } from '../../api/services/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';

type AuthNavigationProp = NativeStackNavigationProp<
    AuthStackParamList,
    'Login'
>;

const CreateAccountScreen = () => {
    const navigation = useNavigation<AuthNavigationProp>();
    const { login: contextLogin } = useAuth();
    const { setIsLoading } = useLoading();

    const [firstName, setFirstName] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [lastName, setLastName] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleCreatePress = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let inputError = false;

        // Validation
        if (firstName.trim() === '') {
            setFirstNameError(true);
            inputError = true;
        } else {
            setFirstNameError(false);
        }

        if (lastName.trim() === '') {
            setLastNameError(true);
            inputError = true;
        } else {
            setLastNameError(false);
        }

        if (email.trim() === '' || !emailRegex.test(email)) {
            setEmailError(true);
            inputError = true;
        } else {
            setEmailError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
            inputError = true;
        } else {
            setPasswordError(false);
        }

        // Create User
        if (!inputError) {
            try {
                setIsLoading(true);
                const userData = {
                    'first_name': firstName,
                    'last_name': lastName,
                    'email': email,
                    'password': password
                }
                const response = await userApi.createUser(userData);
                if (response) {
                    const response = await authApi.login({ email, password });
                    await contextLogin(response.access_token, response.user_data);
                }
            } catch (error) {
                Alert.alert(
                    'Failed to create account',
                );
            } finally {
                setIsLoading(false);
            }
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
                <Text style={styles.createAccountText}>Create Account</Text>
                <Text style={styles.tagline}>Let's start budgeting</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.inputLabel,
                            firstNameError ? { color: colors.error_red } : null
                        ]}>
                        FirstName
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            firstNameError ? { borderColor: colors.error_red } : null
                        ]}
                        placeholder='First Name'
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.inputLabel,
                            lastNameError ? { color: colors.error_red } : null
                        ]}>
                        Last Name
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            lastNameError ? { borderColor: colors.error_red } : null
                        ]}
                        placeholder='Last Name'
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.inputLabel,
                            emailError ? { color: colors.error_red } : null
                        ]}>
                        Email
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            emailError ? { borderColor: colors.error_red } : null
                        ]}
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text
                        style={[
                            styles.inputLabel,
                            passwordError ? { color: colors.error_red } : null
                        ]}>
                        Password
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            passwordError ? { borderColor: colors.error_red } : null
                        ]}
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize='none'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={handleCreatePress}>
                        <Text style={styles.createButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: 10,
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
    createAccountText: {
        marginTop: 30,
        marginBottom: 5,
        letterSpacing: 0.5,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.heavy,
        fontSize: typography.sizes.moneyLarge,
        color: colors.primary,
    },
    tagline: {
        letterSpacing: 0.2,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.regular,
        fontSize: typography.sizes.title,
        color: colors.primary,
    },
    formContainer: {
        flexDirection: 'column',
        width: '100%',
        gap: 15,
    },
    inputContainer: {
        width: "90%",
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputLabel: {
        marginLeft: "20%",
        marginBottom: 10,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: 15,
        color: colors.black
    },
    input: {
        width: '60%',
        height: 35,
        alignSelf: 'center',
        paddingLeft: 10,
        fontSize: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white,
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
    createButton: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        fontSize: 14,
        borderRadius: 50,
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
    createButtonText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.header,
        color: colors.white
    },
});

export default CreateAccountScreen;

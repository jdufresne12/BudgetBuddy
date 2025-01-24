import React, { useEffect, useState} from "react";
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { typography, colors } from '../assets/theme.ts';

interface MonthSliderProps {
    month: number;
    setMonth: React.Dispatch<React.SetStateAction<number>>;
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
  }

function MonthSlider({ month, setMonth, year, setYear }: MonthSliderProps): React.JSX.Element {
    const MONTHS: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    function backOneMonth() {
        if(month === 0){ 
            // December <- January
            setMonth(11);
            setYear(year - 1);
        } else 
            setMonth(month - 1);
    }
    function upOneMonth() {
        if(month === 11){ 
            // December -> January
            setMonth(0);
            setYear(year + 1);
        } else 
            setMonth(month + 1);
    }

    return (
      <View style={styles.container}>
        <View style={styles.monthContainer}>
            {/* Left Chevron */}
            <TouchableOpacity 
                style={styles.leftChevron}
                onPress={() => backOneMonth()}
            >
                <Icon name={"chevron-back"} size={25} color={colors.primary} />
            </TouchableOpacity>

            {/* Month */}
            <View style={styles.month}>
                <Text style={styles.monthText}>{`${MONTHS[month]}   ${year}`}</Text>
            </View>

            {/* Right Chevron */}
                <TouchableOpacity
                    style={styles.rightChevron}
                    onPress={() => upOneMonth()}
                >
                    <Icon name={"chevron-forward"} size={25} color={colors.primary} />
                </TouchableOpacity> 
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'center',
        paddingBottom: 25,
        gap: 25,
      },
    monthContainer: {
        flexDirection: 'row',
        height: 50,
        width: '85%',
        borderRadius: 20,
        backgroundColor: 'white',
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
    leftChevron: {
        width: '25%',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    rightChevron: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    month: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    monthText: {
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.sizes.header,
        color: colors.black,
    }
});

export default MonthSlider;
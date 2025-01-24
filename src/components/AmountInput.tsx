import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, Modal, View, StyleSheet, Platform } from 'react-native';
import { formatToDollar } from '../utils/textFormatting';

interface AmountInputProps {
    number: string,
    setNumber: React.Dispatch<React.SetStateAction<number | any>>
}

const AmountInput = ({ number, setNumber }: AmountInputProps) =>{
    const [showKeypad, setShowKeypad] = useState(false);
  
    const handleBackdropPress = () => {
        setShowKeypad(false);
    };

    const onNumberPress = (num: string) => {
        if (num === '⌫') {
          const newValue = number.length > 1 ? parseFloat(number.slice(0, -1)) : 0;
          setNumber(Number(newValue));
          return;
        }
        if (num === '.' && number.includes('.')) return;
        
        const newValue = number === '0' && num !== '.' ? 
          parseFloat(num) : 
          parseFloat(number + num);
        setNumber(Number(newValue));
      };

    return (
        <View>
          <TouchableOpacity onPress={() => setShowKeypad(true)}>
            <Text style={styles.number}>{formatToDollar(parseInt(number.toString()))}</Text>
          </TouchableOpacity>
    
          <Modal
            visible={showKeypad}
            transparent
            animationType="slide"
            onRequestClose={() => setShowKeypad(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={handleBackdropPress}
            >
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={e => e.stopPropagation()}
                style={styles.keypad}
              >
                {[1,2,3,4,5,6,7,8,9,'.',0,'⌫'].map(num => (
                  <TouchableOpacity 
                    key={num}
                    style={styles.key}
                    onPress={() => onNumberPress(num.toString())}
                  >
                    <Text style={styles.keyText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    number: {
        fontSize: 48,
        fontWeight: '600',
    },
    keypad: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#f5f5f5',
        padding: 10,
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    key: {
        width: '33.33%',
        padding: 20,
        alignItems: 'center',
    },
    keyText: {
        fontSize: 24,
    }
});

export default AmountInput;
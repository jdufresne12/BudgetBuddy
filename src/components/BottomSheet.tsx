import React, { useEffect, useState } from 'react';
import { Animated, Platform, Modal, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../assets/theme';

interface BottomSheetProps {
    visible: boolean,
    onClose: any,
    children: any
}

const BottomSheet = ({ visible, onClose, children }: BottomSheetProps) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.bottomSheet,
            { transform: [{ translateY }] }
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: Dimensions.get('window').height - 75,
  }
});

export default BottomSheet;
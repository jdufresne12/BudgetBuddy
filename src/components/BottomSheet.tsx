import React, { useEffect, useState } from 'react';
import { Animated, Platform, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../assets/theme';

interface BottomSheetProps {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: any,
  children: any
}

const BottomSheet = ({ visible, setVisible, onClose, children }: BottomSheetProps) => {
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
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY }] }
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.contentContainer}
          >
            {children}
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    padding: 20,
  }
});

export default BottomSheet;
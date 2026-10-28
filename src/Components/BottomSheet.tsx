import React from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../styles/responsiveSize';
import styles from './styles';
export default function BottomSheet({
  visible,
  title,
  onClose,
  children,
  footer,
  hideHeader = false,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hideHeader?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheetOverlay}>
          <Pressable
            accessibilityLabel={`Dismiss ${title}`}
            style={styles.sheetBackdrop}
            onPress={onClose}
          />
          <View
            accessibilityViewIsModal
            style={[
              styles.sheet,
              {paddingBottom: Math.max(insets.bottom, scale(12))},
            ]}
          >
            {!hideHeader && (
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>{title}</Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Close ${title}`}
                  hitSlop={10}
                  onPress={onClose}
                >
                  <Icon name="close" size={scale(23)} color="#202522" />
                </TouchableOpacity>
              </View>
            )}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={
                !hideHeader ? styles.sheetContent : undefined
              }
            >
              {children}
            </ScrollView>
            {footer}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

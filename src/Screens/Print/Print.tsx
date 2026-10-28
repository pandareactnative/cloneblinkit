import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WrapperContainer from '../../Components/WrapperContainer';
import commonStyles from '../../styles/commonStyles';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';
export default function Print() {
  const [color, setColor] = useState(false);
  return (
    <WrapperContainer>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>BLINKIT PRINT STORE</Text>
        <Text style={styles.title}>Printouts at your doorstep</Text>
        <Text style={styles.subtitle}>
          Everyday documents, delivered in minutes.
        </Text>
        <View style={styles.paper}>
          <Icon
            name="file-document-outline"
            size={scale(100)}
            color="#697e5c"
          />
          <Text style={styles.paperText}>A4 · 80 GSM</Text>
        </View>
        <View style={styles.toggleRow}>
          {['Black & white', 'Colour'].map((label, index) => (
            <TouchableOpacity
              key={label}
              accessibilityRole="radio"
              accessibilityState={{checked: color === !!index}}
              accessibilityLabel={label}
              onPress={() => setColor(!!index)}
              style={[styles.toggle, color === !!index && styles.active]}
            >
              <Text style={commonStyles.text}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Choose a document"
          style={commonStyles.button}
          onPress={() =>
            Alert.alert(
              'Print preview',
              'Document upload and print delivery are not connected in this UI study.',
            )
          }
        >
          <Text style={commonStyles.buttonText}>Choose a document</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
}

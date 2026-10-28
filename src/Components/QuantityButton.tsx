import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Product} from '../constants/catalog';
import {productQuantity, useShopping} from '../store/ShoppingContext';
import GradientBackground from './GradientBackground';
import styles from './styles';

export default function QuantityButton({
  product,
  option,
}: {
  product: Product;
  option?: string;
}) {
  const {state, dispatch, addProduct} = useShopping();
  const quantity = option
    ? state.cart.find(
        item => item.productId === product.id && item.option === option,
      )?.quantity || 0
    : productQuantity(state.cart, product.id);
  return quantity ? (
    <View style={styles.quantityButton}>
      <GradientBackground colors={['#69ad45', '#31850e']} />
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Decrease ${product.name}${
          option ? ` ${option}` : ''
        }`}
        hitSlop={4}
        style={styles.step}
        onPress={() =>
          dispatch({type: 'change', productId: product.id, option, delta: -1})
        }
      >
        <Text style={styles.stepText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Increase ${product.name}${
          option ? ` ${option}` : ''
        }`}
        hitSlop={4}
        style={styles.step}
        onPress={() =>
          option
            ? addProduct(product.id, option)
            : dispatch({type: 'change', productId: product.id, delta: 1})
        }
      >
        <Text style={styles.stepText}>+</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Add ${product.name}${option ? ` ${option}` : ''}`}
      style={styles.addButton}
      onPress={() => addProduct(product.id, option)}
    >
      <Text style={styles.addText}>ADD</Text>
      {!option && product.options && (
        <View style={styles.optionHint}>
          <Text style={styles.optionHintText}>
            {product.options.length} options
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

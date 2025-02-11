import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../../assets/styles/globalStyle';

const Products = () => {
  const ProductData = [
    {
      id: 1,
      title: 'Dream Manifestation Journal',
      cuttedPrice: '1200',
      price: '1000',
      ratings: 4,
    },
    {
      id: 2,
      title: 'Self-Care Planner',
      cuttedPrice: '1500',
      price: '1250',
      ratings: 4.5,
    },
    {
      id: 3,
      title: 'Daily Gratitude Notebook',
      cuttedPrice: '900',
      price: '750',
      ratings: 4.2,
    },
    {
      id: 4,
      title: 'Mindfulness Journal',
      cuttedPrice: '1300',
      price: '1100',
      ratings: 4.3,
    },
  ];

  return (
    <SafeAreaView style={[globalStyle.bgTheme, globalStyle.flex]}>
      <ScrollView contentContainerStyle={styles.container}>
        {ProductData.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.cuttedPrice}>₹{product.cuttedPrice}</Text>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.ratings}>⭐ {product.ratings}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  productCard: {
    width: '48%', // To fit 2 columns in a row
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cuttedPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  ratings: {
    fontSize: 14,
    color: '#FFD700',
  },
});

export default Products;

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../../assets/styles/globalStyle';
import {productStyle} from './Style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../redux/actions/ProductAction';
import {AddtoCart} from '../../redux/actions/CartAction';
import {INCREMENT_QUANTITY} from '../../redux/constants/CartConstants';
import Notification from '../../components/Notification/Notification';
import {AddNotification} from '../../redux/actions/NotificationAction';
import { useNavigation } from '@react-navigation/native';

const Products = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.products);
  const {cart} = useSelector(state => state.cart);
  const [loadingId, setLoadingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {notifications} = useSelector(state => state.notifications);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddtoCart = product => {
    setLoadingId(product.id);

    setTimeout(() => {
      const isProductInCart = cart.some(item => item.id === product.id);

      if (!isProductInCart) {
        setSelectedProduct(product);
        setModalVisible(true);
      } else {
        dispatch({
          type: INCREMENT_QUANTITY,
          payload: product.id,
        });
        dispatch(AddNotification('Product added to cart'));
      }

      setLoadingId(null);
    }, 2000);
  };

  const handleContinue = () => {
    if (selectedProduct) {
      dispatch(AddtoCart(selectedProduct));
      setModalVisible(false);
      dispatch(AddNotification('Product added to cart'));
    }
  };

  return (
    <SafeAreaView style={[globalStyle.bgTheme, globalStyle.flex]}>
      <ScrollView
        contentContainerStyle={productStyle.container}
        showsVerticalScrollIndicator={false}>
        {products.map((item, i) => (
          <View style={productStyle.productCard} key={i}>
            <View style={productStyle.productCardBody}>
              <Pressable onPress={()=>navigation.navigate('ProductDetail',{product:item})}>
                <Image source={item.thumbnail} style={productStyle.mockup} />
              </Pressable>
              <View style={globalStyle.mt3}>
                <View
                  style={[
                    globalStyle.drow,
                    globalStyle.g2,
                    globalStyle.alignCenter,
                  ]}>
                  <View style={productStyle.ratings}>
                    <Text style={productStyle.ratingText}>{item.ratings}</Text>
                    <FontAwesomeIcon icon={faStar} color="#fff" size={10} />
                  </View>
                  <View>
                    <Text style={[globalStyle.xsSmall, globalStyle.textSlate]}>
                      ({item.reviews} Reviews)
                    </Text>
                  </View>
                </View>
                <Pressable onPress={()=>navigation.navigate('ProductDetail',{product:item})}>
                  <View style={globalStyle.mt3}>
                    <Text style={productStyle.title}>{item.title}</Text>
                    <View
                      style={[
                        globalStyle.drow,
                        globalStyle.alignCenter,
                        globalStyle.cg5,
                        globalStyle.mt3,
                      ]}>
                      <Text style={productStyle.cuttedPrice}>
                        Rs.{item.cuttedPrice}
                      </Text>
                    </View>
                    <Text style={productStyle.price}>Rs.{item.price}</Text>
                  </View>
                </Pressable>

                <View style={globalStyle.mt10}>
                  <Pressable
                    style={productStyle.addtocart}
                    onPress={() => handleAddtoCart(item)}>
                    {loadingId === item.id ? (
                      <View
                        style={[
                          globalStyle.drow,
                          globalStyle.alignCenter,
                          globalStyle.cg3,
                        ]}>
                        <ActivityIndicator size="small" color={'#fff'} />
                        <Text style={globalStyle.textWhite}>Add to cart</Text>
                      </View>
                    ) : (
                      <Text style={globalStyle.textWhite}>Add to cart</Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={productStyle.modalOverlay}>
          <View style={productStyle.modalContent}>
            {selectedProduct && (
              <>
                <Image
                  source={selectedProduct.thumbnail}
                  style={productStyle.modalImage}
                />
                <Text style={productStyle.modalTitle}>
                  {selectedProduct.title}
                </Text>
                <Text style={productStyle.modalPrice}>
                ₹ {selectedProduct.price}
                </Text>
                <Pressable
                  style={productStyle.continueBtn}
                  onPress={handleContinue}>
                  <Text style={globalStyle.textWhite}>Continue</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          showCartButton={true}
        />
      ))}
    </SafeAreaView>
  );
};

export default Products;

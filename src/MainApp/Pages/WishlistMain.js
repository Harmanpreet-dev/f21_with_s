import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-ui-lib';
import { caretHidden } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { ScrollView } from 'react-native-gesture-handler';
import AppBarMain from '../Components/AppBarMain';

const CartMain = ({ navigation }) => {
  const [CartItems, setCartItems] = useState([]);
  const State = useSelector(state => state.WishListReducer.WishList);

  const dispatch = useDispatch();

  useEffect(() => {
    getCartItems();
  });

  const getCartItems = () => {
    setCartItems(State);
  };

  const removeItem = item => {
    dispatch({
      type: 'REMOVE_WISHLIST_ITEM',
      payload: item.id,
    });
    let newCart = CartItems.filter(i => i.id !== item.id);
    setCartItems(newCart);
  };

  const handleMoveWishlist = item => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const EmptyScreen = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Favourites</Text>
      <Text style={styles.emptyText2}>
        You can add item to your Favourites by clicking "Heart Icon" on products
      </Text>
      <Button
        mode="contained"
        style={styles.emptyButton}
        labelStyle={styles.emptyButtonText}
        contentStyle={styles.emptyButtonContent}
        onPress={() => {
          navigation.navigate('Froever');
        }}
      >
        Continue Shopping
      </Button>
    </View>
  );

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.container}
      >
        {CartItems.length == 0 ? (
          <View>
            <EmptyScreen />
          </View>
        ) : null}
        {CartItems.map((item, index) => (
          <View key={index}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                marginVertical: 10,
              }}
            >
              <View style={styles.cartItemContainer}>
                <View style={styles.cartItemImageContainer}>
                  <Image
                    style={styles.headerImage}
                    source={{ uri: item.image }}
                  />
                </View>
                <View style={styles.cartItemDetailsContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.item}>Size: {item.size}</Text>
                  <Text style={styles.item}>Color: {item.color}</Text>
                  <Text style={styles.price}>AED {item.price}</Text>
                </View>
              </View>
              <View style={styles.cartItemButtonsContainer}>
                <TouchableOpacity onPress={() => removeItem(item)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMoveWishlist(item)}>
                  <Text>Move To Bag</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CartMain;

const styles = StyleSheet.create({
  addToCartButtonBag: {
    backgroundColor: 'black',
    width: '100%',
    padding: 4,
  },
  headerImage: {
    height: 150,
    width: Dimensions.get('window').width / 2 - 120,
  },
  cartItemContainer: {
    backgroundColor: 'white',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemImageContainer: {
    width: 100,
  },
  cartItemDetailsContainer: {
    width: '80%',
    paddingLeft: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',

    marginHorizontal: 5,
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  item: {
    fontSize: 14,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  cartItemButtonsContainer: {
    margin: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 50,
    width: '100%',

    paddingVertical: 20,
    paddingHorizontal: 20,
    // borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  container: {
    height: Dimensions.get('window').height - 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 150,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText2: {
    fontSize: 18,
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  emptyButton: {
    width: '80%',
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'black',
  },
  emptyButtonText: {
    fontSize: 16,
  },
  emptyButtonContent: {
    fontSize: 16,
  },
});

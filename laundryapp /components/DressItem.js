import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, decrementQuantity, incrementQuantity} from "../CartReducer"
import {decrementQty,incrementQty} from "../ProductReducer"

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart.cart)
  const addItemToCart=()=>
  {
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  }
  return (
    <View>
      <TouchableOpacity className="flex-row bg-white items-center py-1 my-2 px-4 justify-between">

        <View>
          <Image
            source={{
              uri: item.image,
            }}
            className="h-24 w-24 rounded-md"
          />
        </View>

        <View>
            <Text className="text-[#a24f5e] font-semibold text-base mb-2 w-24">
                {item.name}
            </Text>
            <Text className="text-[#a24f5e]">
                ${item.price}
            </Text>
        </View>

        {cart.some((c) => c.id === item.id) ?(
         <View className="flex-row mr-5 items-center w-20">
          <TouchableOpacity onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQty(item)); // product
              }}
              className="">
            <Text className='text-3xl font-bold text-[#a24f5e] mr-3 ml-2'>-</Text>
          </TouchableOpacity>
          <Text className="mr-3 font-bold text-xl text-[#a24f5e]">
            {item.quantity}
          </Text>
          <TouchableOpacity onPress={() => {
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQty(item)); //product
              }}>
            <Text className="text-3xl font-bold text-[#a24f5e]">+</Text>
          </TouchableOpacity>
         </View>
        ):(

          <TouchableOpacity onPress={addItemToCart} className=" mr-5 bg-[#a24f5e] px-5 py-2 rounded-lg ">
              <Text className="text-center text-white font-bold">Add</Text>
          </TouchableOpacity>

        )
        }


      </TouchableOpacity>
    </View>
  );
};

export default DressItem;

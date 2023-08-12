import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { clearquantity, decrementQty, incrementQty } from "../ProductReducer";
import { decrementQuantity, incrementQuantity, cleanCart} from "../CartReducer";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
    const userUid = auth.currentUser.uid;
    const placeOrder = async () => {
      navigation.replace("OrderScreen");
      dispatch(cleanCart());
      dispatch(clearquantity());
      await setDoc(
        doc(db, "users", `${userUid}`),
        {
          orders: { ...cart },
        },
        {
          merge: true,
        }
      );
    };


  if (!cart.length) {
    const back = () => {
      navigation.goBack();
    };
    back();
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row px-5 py-2 items-center">
          <TouchableOpacity
            className="pr-28"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={30} color={"#a24f5e"} opacity={2} />
          </TouchableOpacity>
          <Text className="font-bold text-lg text-[#a24f5e]">Your Items </Text>
        </View>
      <ScrollView className="">
        <View>
          {cart.map((item, index) => (
            <View key={index} className="px-5 flex-row mt-6 items-center pb-2">
              <Image
                source={{
                  uri: item.image,
                }}
                className="h-16 w-16 rounded-md"
              />

              <View className="px-8 flex-1">
                <Text className="font-bold text-[#a24f5e]">{item.name}</Text>
                <Text className="font-bold text-[#a24f5e]">
                  Total per Item: {item.quantity * item.price}$
                </Text>
              </View>

              <View className="flex-row mr-5 items-center w-20">
                <TouchableOpacity
                  onPress={() => {
                    dispatch(decrementQuantity(item)); // cart
                    dispatch(decrementQty(item)); // product
                  }}
                  className=""
                >
                  <Text className="text-3xl font-bold text-[#a24f5e] mr-3 ml-2">
                    -
                  </Text>
                </TouchableOpacity>
                <Text className="mr-3 font-bold text-xl text-[#a24f5e]">
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(incrementQuantity(item)); // cart
                    dispatch(incrementQty(item)); //product
                  }}
                >
                  <Text className="text-3xl font-bold text-[#a24f5e]">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="px-5 py-3 bg-white">
        <View className="flex-row items-center pb-2">
          <Text className="flex-1 font-semibold text-lg text-[#a24f5e]">Price</Text>
          <Text className="font-semibold text-lg text-[#a24f5e] pr-6">{total}$</Text>
        </View>

        <View className="flex-row items-center pb-2">
          <Text className="flex-1 font-semibold text-lg text-[#a24f5e]">Delivery and Pick up Fee</Text>
          <Text className="font-semibold text-lg text-[#a24f5e] pr-6">40$</Text>
        </View>

        <View className="flex-row items-center pb-2">
          <Text className="flex-1 font-semibold text-lg text-[#a24f5e]">Total Price</Text>
          <Text className="font-semibold text-lg text-[#a24f5e] pr-6">{total+40}$</Text>
        </View>
        
        <TouchableOpacity onPress={()=>placeOrder()} className="bg-[#a24f5e] p-5 mb-5 rounded-md">
         <Text className="font-bold text-lg text-center text-white">Place Order</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
    
    
  );
};

export default PickUpScreen;

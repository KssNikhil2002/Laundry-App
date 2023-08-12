import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  MapPinIcon,
  UserIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native";
import SlidingWindow from "../components/SlidingWindow";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const [items,setItems] = useState([]);
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service)=>dispatch(getProduct(service)))
    };
    fetchProducts();
  }, []);
  console.log(product);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "Shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "Dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "Jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.f1laticon.com/128/3345/3345397.png",
      name: "Shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <SafeAreaView className="mb-20">
        <ScrollView className="">
          <View className="flex-row space-x-2 mx-4 items-center mt-2">
            <MapPinIcon size={35} color={"#a24f5e"} />
            <View className="flex-1">
              <Text className="text-lg font-bold text-[#a24f5e]">
                Current Location
              </Text>
              <Text className="text-s text-[#a24f5e] font-bold">
                {displayCurrentAddress}
              </Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("ProfileScreen")}>
              <UserIcon size={35} color={"#a24f5e"} />
            </TouchableOpacity>
          </View>

          <View className=" flex-row items-center space-x-2 pb-2 mx-2 px-2 mt-3">
            <View className="flex-row flex-1 space-x-3 bg-gray-200 p-3 rounded-lg">
              <TextInput
                placeholder="Search for items"
                keyboardType="default"
                className="flex-1 text-[#a24f5e]"
              />
              <MagnifyingGlassIcon color="#a24f5e" size={25} />
            </View>
          </View>

          <SlidingWindow />

          <Services />
          {product.map((item, index) => (
            <DressItem item={item} key={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
      {total === 0 ? null : (
        <View className="absolute bottom-10 w-full z-50">
          <TouchableOpacity onPress={()=>navigation.navigate("PickUpScreen")}
          className="bg-[#a24f5e] rounded-md mx-5 p-3 flex-row items-center">
            <View className="flex-1">
              <Text className="text-white font-extrabold text-lg pb-1">
                {cart.length} items
              </Text>
              <Text className="text-white font-bold">
                Extra Charges May Apply
              </Text>
            </View>
            <Text className="text-white font-extrabold">Proceed To Pickup</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

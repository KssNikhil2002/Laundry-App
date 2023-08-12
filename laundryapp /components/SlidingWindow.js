import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
const SlidingWindow = () => {
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];
  const Item = ({title}) => (
    <TouchableOpacity className="mx-4 mt-2 shadow-lg">
      <Image
      source={{uri:title}}
      className="h-60 w-96 rounded-md"/>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList data={images} horizontal={true} showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <Item title={item} />}
      />
    </View>
  );
};

export default SlidingWindow;

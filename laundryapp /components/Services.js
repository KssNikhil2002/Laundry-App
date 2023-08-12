import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  return (
    <View className="mt-4 px-4">
      <Text className="font-bold text-lg mx-1 text-[#a24f5e]">Services Provided</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service,index)=>(
          <TouchableOpacity 
          className="mx-4 my-4 items-center px-2 py-2 bg-white rounded-lg shadow-md"
          key={index}>
            <Image
            source={{uri:service.image}}
            className="h-24 w-24 rounded-md"/>
            <Text className="text-center text-[#a24f5e] pt-1 font-bold">{service.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services
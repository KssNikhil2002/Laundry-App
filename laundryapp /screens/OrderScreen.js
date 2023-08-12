import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")} className="p-4">
        <ArrowLeftIcon size={30} color={"#a24f5e"}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OrderScreen
import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const ProfileScreen = () => {
  const auth = FIREBASE_AUTH
  const user = auth.currentUser;
  console.log(user)
  const navigation = useNavigation();
  const signOutUser = () => {
    FIREBASE_AUTH.signOut();
  };
  return (
    <SafeAreaView className="">
        <TouchableOpacity onPress={()=>navigation.goBack()} className="p-6 pl-10">
            <ArrowLeftIcon size={30} color={"#a24f5e"}/>
        </TouchableOpacity>
      <View className="items-center justify-center mt-56">
        <TouchableOpacity>
          <Text className="font-bold mb-3 text-[#a24f5e] text-3xl">Welcome {user?.email}</Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={signOutUser}>
          <Text className="font-bold mb-3 text-[#a24f5e] text-xl">SignOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

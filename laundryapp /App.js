import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TailwindProvider } from "react-native-tailwindcss";
import HomeScreen from "./screens/HomeScreen";
import * as Location from "expo-location";
import { Provider } from "react-redux";
import store from "./store";
import PickUpScreen from "./screens/PickUpScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import OrderScreen from "./screens/OrderScreen";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

function InsideLayout(){
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <InsideStack.Screen name="PickUpScreen" component={PickUpScreen} options={{headerShown:false}} />
      <InsideStack.Screen name="OrderScreen" component={OrderScreen} options={{presentation:"fullScreenmodal", headerShown:false}} />
      <InsideStack.Screen name="ProfileScreen" component={ProfileScreen} options={{presentation:"fullScreenModal", headerShown:false}}  />
    </InsideStack.Navigator>
  )
}
function OutsideLayout(){
  return(
    <OutsideStack.Navigator>
      <OutsideStack.Screen name="LoginScreen" component={LoginScreen} options={{presentation:"fullScreenModal", headerShown:false}}  />
      <OutsideStack.Screen name="RegisterScreen" component={RegisterScreen} options={{presentation:"fullScreenModal", headerShown:false}}  />
    </OutsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      setUser(user);
    });
  },[])
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="outside">
        {user?
        (
          <Stack.Screen name="inside" component={InsideLayout} options={{presentation:"fullScreenModal", headerShown:false}}/>
        ):
        (
          <Stack.Screen name="outside" component={OutsideLayout} options={{presentation:"fullScreenModal", headerShown:false}}/>
        )
        }
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  
  )
}

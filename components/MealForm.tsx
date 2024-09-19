import { Text, View,TextInput, TouchableOpacity } from "react-native"
import {useState, useContext} from "react"
import Header from "./Header"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";
import Footer from "./Footer";
import Entypo from '@expo/vector-icons/Entypo';
import { postMeal } from "@/apiRequests";
import { UserContext } from "./UserContext";
type Props = NativeStackScreenProps<RootStackParamList, "MealForm">;

export default function MealForm({navigation}: Props) {
  const [foodName, setFoodName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [calories, setCalories] = useState("")
  const [carbs, setCarbs] = useState("")
  const [fats, setFats] = useState("")
  const [protein, setProtein] = useState("")
  const { userDetails, setUserDetails } = useContext(UserContext);
  
  const addFood = () => {
    postMeal(foodName, quantity, calories, carbs, fats, protein, (userDetails as any).userId)
  }
  
  const goBack = () => {
    navigation.navigate("Meals")
  }

  return(
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
       <Header />
       <Entypo name="arrow-with-circle-left" size={26} color="white" onPress={goBack} style={{padding:20}}/>
       <View style={{paddingLeft:20, paddingTop:20, gap:20}}>
       <TextInput
                    onChangeText={(text) => {
                      setFoodName(text);
                    }}
                    value={foodName}
                    placeholder="Enter food name"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6', fontSize:16}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setQuantity(text);
                    }}
                    value={quantity}
                    placeholder="Enter quantity"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6', fontSize:16}}
                  />
                   <TextInput
                    onChangeText={(text) => {
                      setCalories(text);
                    }}
                    value={calories}
                    placeholder="Enter calories"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6', fontSize:16}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setCarbs(text);
                    }}
                    value={carbs}
                    placeholder="Enter carbs amount"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6', fontSize:16}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setFats(text);
                    }}
                    value={fats}
                    placeholder="Enter fats amount"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6', fontSize:16}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setProtein(text);
                    }}
                    value={protein}
                    placeholder="Enter protein amount"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6', fontSize:16}}
                  />
                  <TouchableOpacity onPress={addFood}><Text style={{
                  marginLeft: 10,
                  borderWidth: 2,
                  borderColor: "darkgrey",
                  borderStyle: "solid",
                  borderRadius: 5,
                  width: 100,
                  fontSize: 16,
                  padding: 2,
                  textAlign: "center",
                  color: "#FAF9F6",
                }}>Add food</Text></TouchableOpacity>
                  </View>
    <Footer navigation={navigation} />
    </View>
  )
}
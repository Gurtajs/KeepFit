import { Text, View,TextInput } from "react-native"
import {useState} from "react"
import Header from "./Header"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";
import Footer from "./Footer";
type Props = NativeStackScreenProps<RootStackParamList, "MealForm">;

export default function MealForm({navigation}: Props) {
  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")
  const [carbs, setCarbs] = useState("")
  const [fats, setFats] = useState("")
  const [protein, setProtein] = useState("")
  
  return(
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
       <Header />
       <View style={{}}>
       <TextInput
                    onChangeText={(text) => {
                      setFoodName(text);
                    }}
                    value={foodName}
                    placeholder="Enter food name"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                   <TextInput
                    onChangeText={(text) => {
                      setCalories(text);
                    }}
                    value={calories}
                    placeholder="Enter calories"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setCarbs(text);
                    }}
                    value={carbs}
                    placeholder="Enter carbs amount"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setFats(text);
                    }}
                    value={fats}
                    placeholder="Enter fats amount"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  <TextInput
                    onChangeText={(text) => {
                      setProtein(text);
                    }}
                    value={protein}
                    placeholder="Enter protein amount"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  </View>
    <Footer navigation={navigation} />
    </View>
  )
}
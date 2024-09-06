import { Icon } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Props {
  navigation:any
}

export default function Footer({ navigation} : Props) {
  return (
    <View style={{
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      backgroundColor: "#80bfff",
      left: 0,
      right: 0,
    }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
     <Icon name="home" size={36} onPress={() => navigation.navigate("Home")} />
     </TouchableOpacity>
     <View style={{marginBottom:5}}><TouchableOpacity onPress={() => navigation.navigate("Workouts")}><FontAwesome5 name="dumbbell" size={25} color="black" /></TouchableOpacity></View>
     <View style={{marginBottom:6}}><TouchableOpacity onPress={() => navigation.navigate("Meals")}><FontAwesome6 name="utensils" size={24} color="black" /></TouchableOpacity></View>
     <TouchableOpacity onPress={() => navigation.navigate("UserDetails")}>
      <Icon
        name="person"
        size={40}
      />
    </TouchableOpacity>
    </View>
  );
}

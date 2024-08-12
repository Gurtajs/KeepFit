import { Icon } from "@rneui/themed";
import { View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


interface Props {
  navigation:any
}

export function Footer({ navigation} : Props) {
  return (
    <>
    
     <Icon name="home" size={36} onPress={() => navigation.navigate("Home")} />
     <View style={{marginBottom:5}}><FontAwesome5 name="dumbbell" size={25} color="black" onPress={() => navigation.navigate("Workouts")}/></View>
      <Icon
        name="person"
        onPress={() => navigation.navigate("UserDetails")}
        size={40}
      />
  
    </>
  );
}

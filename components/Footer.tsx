import { Icon } from "@rneui/themed";
import { View } from "react-native";

interface Props {
  navigation:any
}

export function Footer({ navigation} : Props) {
  return (
    <>
     <View style={{flex:1, flexDirection: "row", justifyContent: "space-between", alignItems: 'flex-end', margin: 10,}}>
     <Icon name="home" size={36} onPress={() => navigation.navigate("Home")} />
      <Icon
        name="person"
        onPress={() => navigation.navigate("UserDetails")}
        size={40}
      />
    </View>
    </>
  );
}

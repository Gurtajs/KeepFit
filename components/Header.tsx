import { View, Image } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: "#121212",
        borderStyle: "solid",
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ flex: 1, height: "10%", width: "50%", paddingTop: 5 }}
      />
    </View>
  );
}



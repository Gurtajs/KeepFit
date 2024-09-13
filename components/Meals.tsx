import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";
import { postNutritionalGoals } from "@/apiRequests";
import { UserContext } from "./UserContext";

type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

export default function Meals({ navigation }: Props) {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [goals, setGoals] = useState<any[]>([]);
  const { userDetails } = useContext(UserContext);

  const addGoals = () => {
    postNutritionalGoals(
      calories,
      protein,
      carbs,
      fats,
      (userDetails as any).userId
    ).then((response: any) => {
      setGoals([response]);
    });
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: any) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  const goForward = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    );
  };

  const goBack = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
      <ScrollView>
        <Header />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, color: "#FAF9F6" }}>Meals</Text>
          <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
            Set your goals:
          </Text>
          <View style={{ marginTop: 5 }}>
            <TextInput
              onChangeText={(text) => setCalories(text)}
              value={calories}
              placeholder="Enter daily calories goal"
              placeholderTextColor={"#FAF9F6"}
              keyboardType="numeric"
              style={{ color: "#FAF9F6" }}
            />
            <TextInput
              onChangeText={(text) => setProtein(text)}
              value={protein}
              placeholder="Enter daily protein goal"
              placeholderTextColor={"#FAF9F6"}
              keyboardType="numeric"
              style={{ color: "#FAF9F6" }}
            />
            <TextInput
              onChangeText={(text) => setCarbs(text)}
              value={carbs}
              placeholder="Enter daily carbs goal"
              placeholderTextColor={"#FAF9F6"}
              keyboardType="numeric"
              style={{ color: "#FAF9F6" }}
            />
            <TextInput
              onChangeText={(text) => setFats(text)}
              value={fats}
              placeholder="Enter daily fats goal"
              placeholderTextColor={"#FAF9F6"}
              keyboardType="numeric"
              style={{ color: "#FAF9F6" }}
            />
          </View>
          <TouchableOpacity onPress={addGoals}>
            <Text
              style={{
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
              }}
            >
              Enter goals
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "#FAF9F6" }}>Your goals for today:</Text>
          {goals.length ? (
            <>
              <Text style={{ color: "#FAF9F6" }}>
                {(goals as any)[0].calories} Calories
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                {(goals as any)[0].protein} Protein
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                {(goals as any)[0].carbs} Carbs
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                {(goals as any)[0].fat} Fats
              </Text>
            </>
          ) : null}

          <View
            style={{
              marginTop: 20,
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
              gap: 20,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Button title="⬅️" onPress={goBack} />
            <Text
              style={{ color: "#FAF9F6", fontSize: 18, marginVertical: 10 }}
            >
              {formatDate(currentDate)}
            </Text>
            <Button title="➡️" onPress={goForward} />
          </View>
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

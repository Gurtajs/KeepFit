import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";
import {
  deleteMealByMealId,
  getProductInfo,
  postNutritionalGoals,
} from "@/apiRequests";
import { UserContext } from "./UserContext";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Camera, useCameraDevices } from "react-native-vision-camera";
type Props = NativeStackScreenProps<RootStackParamList, "Meals">;
import { getMeals } from "@/apiRequests";
import UserDetails from "./UserDetails";

export default function Meals({ navigation }: Props) {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [goals, setGoals] = useState<any[]>([]);
  const { userDetails } = useContext(UserContext);
  const [selected, setSelected] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<number | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [productInfo, setProductInfo] = useState<any[]>([]);
  const cameraRef = useRef(null);
  const [isScanning, setIsScanning] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (userDetails) {
      getMeals((userDetails as any).userId).then((response: any) => {
        console.log(response);
        setMeals(response);
      });
    }
  }, [userDetails]);

  const handleBarCodeScanned = (event: {
    type: string;
    data: string;
    bounds?: {
      origin: { x: number; y: number };
      size: { width: number; height: number };
    };
    cornerPoints?: { x: number; y: number }[];
  }) => {
    if (isScanning) {
      setScannedData(event);
      setBarcode(event.data);
      setScanning(false);
      setScanned(true);
      setIsScanning(false);
      Alert.alert("Bar code scanned!");
      setTimeout(() => {
        setIsScanning(true);
      }, 5000);
      getProductInfo(event.data).then((response) => {
        setProductInfo(response);
        console.log("new", productInfo);
      });
    }
  };

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

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const openCamera = () => {
    setShowCamera((prev) => !prev);
    setVisibility(false);
  };

  const closeScanner = () => {
    setShowCamera((prev) => !prev);
  };

  const deleteMeal = () => {
    deleteMealByMealId((userDetails as any).userId, (meals as any).mealId).then(
      () => {
        console.log("deleted successfully");
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
      <ScrollView>
        <Header />
        <View style={{ marginLeft: 10, marginBottom: 60 }}>
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
          <Calendar
            onDayPress={(day: any) => {
              setSelected(day.dateString);
            }}
          />
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
          {showCamera ? (
            <CameraView facing={facing} onBarcodeScanned={handleBarCodeScanned}>
              <View style={{ height: 200, width: 200 }}>
                <View style={{ flex: 1, flexDirection: "row", gap: 170 }}>
                  <TouchableOpacity onPress={toggleCameraFacing}>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      Flip Camera
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeScanner}>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      Close scanner
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CameraView>
          ) : null}
          <View style={{ gap: 15 }}>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Breakfast</Text>
              <Button
                title="Enter breakfast"
                onPress={() =>
                  navigation.navigate("MealForm", { mealType: "breakfast", date: currentDate })
                }
              ></Button>
              <Button title="Scan barcode" onPress={openCamera}></Button>
              {meals
                .filter((meal: any) => meal.mealTime == "breakfast")
                .map((filteredMeal) => (
                  <View style={{}} key={(filteredMeal as any).MealId}>
                    <Text style={{ color: "#FAF9F6" }}>
                      {(filteredMeal as any).mealName}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Quantity: {(filteredMeal as any).quantity}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Calories: {(filteredMeal as any).calories}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Carbs: {(filteredMeal as any).carbs}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}
                    </Text>
                    <TouchableOpacity onPress={deleteMeal}>
                      <Text style={{
                      marginTop:5,
                      borderWidth: 2,
                      borderColor: "darkgrey",
                      borderStyle: "solid",
                      borderRadius: 5,
                      width: 80,
                      fontSize: 12,
                      padding: 2,
                      textAlign: "center",
                      color: "#FAF9F6",
                    }}>Delete meal</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <Text style={{ color: "#FAF9F6" }}>
                Total Calories{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "breakfast")
                  .reduce((acc: any, meal: any) => acc + meal.calories, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Carbs{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "breakfast")
                  .reduce((acc: any, meal: any) => acc + meal.carbs, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "breakfast")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "breakfast")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
              </Text>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Lunch</Text>
              <Button
                title="Enter lunch"
                onPress={() =>
                  navigation.navigate("MealForm", { mealType: "lunch" })
                }
              ></Button>
              <Button title="Scan barcode" onPress={openCamera}></Button>
              {meals
                .filter((meal: any) => meal.mealTime == "lunch")
                .map((filteredMeal) => (
                  <View style={{}} key={(filteredMeal as any).MealId}>
                    <Text style={{ color: "#FAF9F6" }}>
                      {(filteredMeal as any).mealName}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Quantity: {(filteredMeal as any).quantity}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Calories: {(filteredMeal as any).calories}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Carbs: {(filteredMeal as any).carbs}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}
                    </Text>
                    <TouchableOpacity onPress={deleteMeal}>
                      <Text style={{
                      marginTop:5,
                      borderWidth: 2,
                      borderColor: "darkgrey",
                      borderStyle: "solid",
                      borderRadius: 5,
                      width: 80,
                      fontSize: 12,
                      padding: 2,
                      textAlign: "center",
                      color: "#FAF9F6",
                    }}>Delete meal</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <Text style={{ color: "#FAF9F6" }}>
                Total Calories{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "lunch")
                  .reduce((acc: any, meal: any) => acc + meal.calories, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Carbs{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "lunch")
                  .reduce((acc: any, meal: any) => acc + meal.carbs, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "lunch")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "lunch")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Snacks</Text>
              <Button
                title="Enter snack"
                onPress={() =>
                  navigation.navigate("MealForm", { mealType: "snacks" })
                }
              ></Button>
              <Button title="Scan barcode" onPress={openCamera}></Button>
              {meals
                .filter((meal: any) => meal.mealTime == "snacks")
                .map((filteredMeal) => (
                  <View style={{}} key={(filteredMeal as any).MealId}>
                    <Text style={{ color: "#FAF9F6" }}>
                      {(filteredMeal as any).mealName}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Quantity: {(filteredMeal as any).quantity}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Calories: {(filteredMeal as any).calories}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Carbs: {(filteredMeal as any).carbs}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}
                    </Text>
                    <TouchableOpacity onPress={deleteMeal}>
                      <Text style={{
                      marginTop:5,
                      borderWidth: 2,
                      borderColor: "darkgrey",
                      borderStyle: "solid",
                      borderRadius: 5,
                      width: 80,
                      fontSize: 12,
                      padding: 2,
                      textAlign: "center",
                      color: "#FAF9F6",
                    }}>Delete meal</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <Text style={{ color: "#FAF9F6" }}>
                Total Calories{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "snacks")
                  .reduce((acc: any, meal: any) => acc + meal.calories, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Carbs{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "snacks")
                  .reduce((acc: any, meal: any) => acc + meal.carbs, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "snacks")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "snacks")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Dinner</Text>
              <Button
                title="Enter dinner"
                onPress={() =>
                  navigation.navigate("MealForm", { mealType: "dinner" })
                }
              ></Button>
              <Button title="Scan barcode" onPress={openCamera}></Button>
              {meals
                .filter((meal: any) => meal.mealTime == "dinner")
                .map((filteredMeal) => (
                  <View key={(filteredMeal as any).MealId}>
                    <Text style={{ color: "#FAF9F6" }}>
                      {(filteredMeal as any).mealName}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Quantity: {(filteredMeal as any).quantity}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Calories: {(filteredMeal as any).calories}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Carbs: {(filteredMeal as any).carbs}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}
                    </Text>
                    <TouchableOpacity onPress={deleteMeal}>
                      <Text style={{
                      marginTop:5,
                      borderWidth: 2,
                      borderColor: "darkgrey",
                      borderStyle: "solid",
                      borderRadius: 5,
                      width: 80,
                      fontSize: 12,
                      padding: 2,
                      textAlign: "center",
                      color: "#FAF9F6",
                    }}>Delete meal</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <Text style={{ color: "#FAF9F6" }}>
                Total Calories:
                {" " + meals
                  .filter((meal: any) => meal.mealTime == "dinner")
                  .reduce((acc: any, meal: any) => acc + meal.calories, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Carbs:
                {" " + meals
                  .filter((meal: any) => meal.mealTime == "dinner")
                  .reduce((acc: any, meal: any) => acc + meal.carbs, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats:
                {" " + meals
                  .filter((meal: any) => meal.mealTime == "dinner")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein: 
                {" " + meals
                  .filter((meal: any) => meal.mealTime == "dinner")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
              </Text>
            </View>

          </View>
          <Text style={{ fontSize: 16, color: "#FAF9F6", marginTop:10 }}>Total of the day:</Text>
          <Text style={{ color: "#FAF9F6" }}>
            Calories:
            {" " + meals.reduce(
              (acc: any, meal: any) => acc + (Number(meal.calories) || 0),
              0
            )}
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Carbs:
            {" " + meals.reduce(
              (acc: any, meal: any) => acc + (Number(meal.carbs) || 0),
              0
            )}
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Fats:
            {" " + meals.reduce(
              (acc: any, meal: any) => acc + (Number(meal.fats) || 0),
              0
            )}
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Protein:
            {" " + meals.reduce(
              (acc: any, meal: any) => acc + (Number(meal.protein) || 0),
              0
            )}
          </Text>
          {scannedData && (
            <View>
              <>
                {productInfo ? (
                  <>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      {(productInfo as any)?.product_name}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      Calories:{" "}
                      {(productInfo as any).nutriments?.["energy-kcal"]}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      Fats:{" "}
                      {Math.round((productInfo as any)?.nutriments?.fat * 10) /
                        10}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      Carbs:{" "}
                      {Math.round(
                        (productInfo as any)?.nutriments?.carbohydrates * 10
                      ) / 10}
                    </Text>
                    <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                      Proteins:{" "}
                      {Math.round(
                        (productInfo as any)?.nutriments?.proteins * 10
                      ) / 10}
                    </Text>
                    <TouchableOpacity>
                      <Text>Add this meal</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </>
            </View>
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

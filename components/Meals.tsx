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
  getMealsByDate,
  getProductInfo,
  postNutritionalGoals,
  postMeal,
  getDailyGoals,
} from "@/apiRequests";
import { UserContext } from "./UserContext";
import { Calendar } from "react-native-calendars";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
type Props = NativeStackScreenProps<RootStackParamList, "Meals">;
import { useIsFocused } from "@react-navigation/native";
import DeleteMeal from "./DeleteMeal";

export default function Meals({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedMealType, setScannedMealType] = useState<any | null>(null);
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
  const [scannedData, setScannedData] = useState<any | null>(null);
  const [productInfo, setProductInfo] = useState<any[]>([]);
  const cameraRef = useRef(null);
  const [isScanning, setIsScanning] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [meals, setMeals] = useState<any[]>([]);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mealAdded, setMealAdded] = useState(false);
  const [mealModal, setMealModal] = useState(false);
  const [date, setDate] = useState("");

  const handleBarCodeScanned = (event: {
    type: string;
    data: number;
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
        setMealModal(true);
        console.log("new", productInfo);
      });
    }
  };

  getDailyGoals((userDetails as any).userId).then((response) =>
    setGoals(response)
  );

  useEffect(() => {
    if (productInfo) {
      setFoodName((productInfo as any)?.product_name);
      console.log("this one", foodName);
      setQuantity("100");
      setCalories((productInfo as any).nutriments?.["energy-kcal"]);
      setCarbs(
        (
          Math.round((productInfo as any)?.nutriments?.carbohydrates * 10) / 10
        ).toString()
      );
      setFats(
        (Math.round((productInfo as any)?.nutriments?.fat * 10) / 10).toString()
      );
      setProtein(
        (
          Math.round((productInfo as any)?.nutriments?.proteins * 10) / 10
        ).toString()
      );
    }
  }, [productInfo]);

  const addGoals = () => {
    postNutritionalGoals(
      calories,
      protein,
      carbs,
      fats,
      newDate,
      (userDetails as any).userId
    ).then((response: any) => {
      setGoals([response]);
    });
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const isFocused = useIsFocused();

  const formatDate = (date: any) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  const newDate =
    formatDate(currentDate)[6] +
    formatDate(currentDate)[7] +
    formatDate(currentDate)[8] +
    formatDate(currentDate)[9] +
    formatDate(currentDate)[5] +
    formatDate(currentDate)[3] +
    formatDate(currentDate)[4] +
    formatDate(currentDate)[2] +
    formatDate(currentDate)[0] +
    formatDate(currentDate)[1];

  useEffect(() => {
    if (userDetails) {
      getMealsByDate((userDetails as any).userId, newDate).then(
        (response: any) => {
          console.log(response);
          setMeals(response);
          setMealAdded(false);
        }
      );
    }
  }, [userDetails, newDate, isFocused, mealAdded]);

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

  const openCamera = (mealType: string) => {
    setScannedMealType(mealType);
    setModalVisible(true);
    setShowCamera(true);
    setVisibility(false);
    setMealModal(false);
  };

  const closeScanner = () => {
    setShowCamera(false);
    setModalVisible(false);
  };

  const addFood = () => {
    postMeal(
      foodName,
      scannedMealType,
      quantity,
      calories,
      carbs,
      fats,
      protein,
      currentDate,
      (userDetails as any).userId
    ).then(() => {
      setMealAdded(true);
      setModalVisible(false);
      setMealModal(false);
      setScanned(false);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
      <ScrollView>
        <Header />
        <View style={{ marginLeft: 10, marginBottom: 60 }}>
          <Text style={{ fontSize: 18, color: "#FAF9F6" }}>Meals</Text>
          <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
            According to your height and weight, to gain muscle mass your daily
            recommended protein intake is between{" "}
            {(userDetails as any).weightUnit == "kg" ? (
              <Text>
                {(userDetails as any).weight * 1.2}g and{" "}
                {(userDetails as any).weight * 1.7}g of protein{" "}
              </Text>
            ) : (
              <Text>
                {(userDetails as any).weight * 0.5}g and{" "}
                {(userDetails as any).weight * 0.8}g of protein{" "}
              </Text>
            )}
          </Text>
          <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
            Your daily recommended maintenance calories given that you do
            moderate exercise 3-5 times a week are:{" "}
            {(userDetails as any).gender == "Male" &&
            (userDetails as any).weightUnit == "kg" &&
            (userDetails as any).heightUnit == "cm" ? (
              <Text>
                {(10 * (userDetails as any).weight +
                  6.25 * (userDetails as any).height -
                  (5 * (userDetails as any).age) + 5) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Male" &&
              (userDetails as any).weightUnit == "lbs" &&
              (userDetails as any).heightUnit == "ft" ? (
              <Text>
                {(10 * ((userDetails as any).weight/2.20462) +
                  (6.25 * ((userDetails as any).height*30.48)) -
                  (5 * (userDetails as any).age) + 5) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Male" &&
              (userDetails as any).weightUnit == "lbs" &&
              (userDetails as any).heightUnit == "cm" ? (
              <Text>
                {(10 * ((userDetails as any).weight/2.20462) +
                  6.25 * (userDetails as any).height -
                  (5 * (userDetails as any).age) + 5) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Male" &&
              (userDetails as any).weightUnit == "kg" &&
              (userDetails as any).heightUnit == "ft" ? (
              <Text>
                {(10 * (userDetails as any).weight +
                  (6.25 * ((userDetails as any).height*30.48)) -
                  (5 * (userDetails as any).age) + 5) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Female" &&
              (userDetails as any).weightUnit == "kg" &&
              (userDetails as any).heightUnit == "cm" ? (
              <Text>
                {(10 * (userDetails as any).weight +
                  6.25 * (userDetails as any).height -
                  (5 * (userDetails as any).age) - 161) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Female" &&
              (userDetails as any).weightUnit == "lbs" &&
              (userDetails as any).heightUnit == "ft" ? (
              <Text>
                {(10 * ((userDetails as any).weight/2.20462) +
                  (6.25 * ((userDetails as any).height*30.48)) -
                  (5 * (userDetails as any).age) - 161) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Female" &&
              (userDetails as any).weightUnit == "lbs" &&
              (userDetails as any).heightUnit == "cm" ? (
              <Text>
                {(10 * ((userDetails as any).weight/2.20462) +
                  6.25 * (userDetails as any).height -
                  (5 * (userDetails as any).age) - 161) *
                  1.55}
              </Text>
            ) : (userDetails as any).gender == "Female" &&
              (userDetails as any).weightUnit == "kg" &&
              (userDetails as any).heightUnit == "ft" ? (
              <Text>
                {(10 * (userDetails as any).weight +
                  (6.25 * ((userDetails as any).height*30.48)) -
                  (5 * (userDetails as any).age) - 161) *
                  1.55}
              </Text>
            ) : null}
          </Text>
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
              console.log(day.dateString);
              setSelected(day.dateString);
              setDate(day.dateString);
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
              {date ? date : formatDate(currentDate)}
            </Text>
            <Button title="➡️" onPress={goForward} />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            {showCamera ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <CameraView
                  facing={facing}
                  onBarcodeScanned={handleBarCodeScanned}
                  style={{ width: 250, height: 300 }}
                >
                  <View style={{ height: 200, width: 210 }}>
                    <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
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
              </View>
            ) : null}
          </Modal>
          <View style={{ gap: 15 }}>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Breakfast</Text>
              <Button
                title="Enter breakfast"
                onPress={() =>
                  navigation.navigate("MealForm", {
                    mealType: "breakfast",
                    date: currentDate,
                  })
                }
              ></Button>
              <Button
                title="Scan barcode"
                onPress={() => {
                  openCamera("breakfast");
                }}
              ></Button>
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
                      Carbs: {(filteredMeal as any).carbs}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}g
                    </Text>
                    <DeleteMeal
                      userDetails={userDetails}
                      meals={meals}
                      meal={filteredMeal}
                      setMeals={setMeals}
                    />
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
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "breakfast")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "breakfast")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
                g
              </Text>
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Lunch</Text>
              <Button
                title="Enter lunch"
                onPress={() =>
                  navigation.navigate("MealForm", {
                    mealType: "lunch",
                    date: currentDate,
                  })
                }
              ></Button>
              <Button
                title="Scan barcode"
                onPress={() => openCamera("lunch")}
              ></Button>
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
                      Carbs: {(filteredMeal as any).carbs}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}g
                    </Text>
                    <DeleteMeal
                      userDetails={userDetails}
                      meals={meals}
                      meal={filteredMeal}
                      setMeals={setMeals}
                    />
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
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "lunch")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "lunch")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
                g
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Snacks</Text>
              <Button
                title="Enter snack"
                onPress={() =>
                  navigation.navigate("MealForm", {
                    mealType: "snacks",
                    date: currentDate,
                  })
                }
              ></Button>
              <Button
                title="Scan barcode"
                onPress={() => openCamera("snacks")}
              ></Button>
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
                      Calories: {(filteredMeal as any).calories}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Carbs: {(filteredMeal as any).carbs}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}g
                    </Text>
                    <DeleteMeal
                      userDetails={userDetails}
                      meals={meals}
                      meal={filteredMeal}
                      setMeals={setMeals}
                    />
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
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "snacks")
                  .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein{" "}
                {meals
                  .filter((meal: any) => meal.mealTime == "snacks")
                  .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
                g
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 16, color: "#FAF9F6" }}>Dinner</Text>
              <Button
                title="Enter dinner"
                onPress={() =>
                  navigation.navigate("MealForm", {
                    mealType: "dinner",
                    date: currentDate,
                  })
                }
              ></Button>
              <Button
                title="Scan barcode"
                onPress={() => openCamera("dinner")}
              ></Button>
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
                      Carbs: {(filteredMeal as any).carbs}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Fats: {(filteredMeal as any).fats}g
                    </Text>
                    <Text style={{ color: "#FAF9F6" }}>
                      Protein: {(filteredMeal as any).protein}g
                    </Text>
                    <DeleteMeal
                      userDetails={userDetails}
                      meals={meals}
                      meal={filteredMeal}
                      setMeals={setMeals}
                    />
                  </View>
                ))}
              <Text style={{ color: "#FAF9F6" }}>
                Total Calories:
                {" " +
                  meals
                    .filter((meal: any) => meal.mealTime == "dinner")
                    .reduce((acc: any, meal: any) => acc + meal.calories, 0)}
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Carbs:
                {" " +
                  meals
                    .filter((meal: any) => meal.mealTime == "dinner")
                    .reduce((acc: any, meal: any) => acc + meal.carbs, 0)}
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Fats:
                {" " +
                  meals
                    .filter((meal: any) => meal.mealTime == "dinner")
                    .reduce((acc: any, meal: any) => acc + meal.fats, 0)}
                g
              </Text>
              <Text style={{ color: "#FAF9F6" }}>
                Total Protein:
                {" " +
                  meals
                    .filter((meal: any) => meal.mealTime == "dinner")
                    .reduce((acc: any, meal: any) => acc + meal.protein, 0)}
                g
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 16, color: "#FAF9F6", marginTop: 10 }}>
            Total nutrients of the day:
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Calories:
            {" " +
              meals.reduce(
                (acc: any, meal: any) => acc + (Number(meal.calories) || 0),
                0
              )}
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Carbs:
            {" " +
              meals.reduce(
                (acc: any, meal: any) => acc + (Number(meal.carbs) || 0),
                0
              )}
            g
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Fats:
            {" " +
              meals.reduce(
                (acc: any, meal: any) => acc + (Number(meal.fats) || 0),
                0
              )}
            g
          </Text>
          <Text style={{ color: "#FAF9F6" }}>
            Protein:
            {" " +
              meals.reduce(
                (acc: any, meal: any) => acc + (Number(meal.protein) || 0),
                0
              )}
          </Text>
          <View>
            <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
              Surplus or deficit calculation:
            </Text>
            <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
              Calories:{" "}
              {Number(calories) -
                meals.reduce(
                  (acc: any, meal: any) => acc + (Number(meal.calories) || 0),
                  0
                )}
            </Text>
            <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
              Carbs:{" "}
              {Number(carbs) -
                meals.reduce(
                  (acc: any, meal: any) => acc + (Number(meal.carbs) || 0),
                  0
                )}
            </Text>
            <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
              Fats:{" "}
              {Number(fats) -
                meals.reduce(
                  (acc: any, meal: any) => acc + (Number(meal.fats) || 0),
                  0
                )}
            </Text>
            <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
              Protein:{" "}
              {Number(protein) -
                meals.reduce(
                  (acc: any, meal: any) => acc + (Number(meal.protein) || 0),
                  0
                )}
            </Text>
          </View>
          {scannedData && productInfo && scanned && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    width: 300,
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {(productInfo as any)?.product_name}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Calories: {(productInfo as any).nutriments?.["energy-kcal"]}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Fats:{" "}
                    {Math.round((productInfo as any)?.nutriments?.fat * 10) /
                      10}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Carbs:{" "}
                    {Math.round(
                      (productInfo as any)?.nutriments?.carbohydrates * 10
                    ) / 10}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    Proteins:{" "}
                    {Math.round(
                      (productInfo as any)?.nutriments?.proteins * 10
                    ) / 10}
                  </Text>
                  <TouchableOpacity onPress={addFood}>
                    <Text
                      style={{
                        borderWidth: 2,
                        borderColor: "darkgrey",
                        borderStyle: "solid",
                        borderRadius: 5,
                        width: 120,
                        fontSize: 14,
                        padding: 2,
                        textAlign: "center",
                      }}
                    >
                      Add this meal
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setProductInfo([]);
                      setMealModal(false);
                      setScanned(false);
                    }}
                    style={{
                      marginTop: 20,
                      padding: 10,
                      backgroundColor: "#2196F3",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

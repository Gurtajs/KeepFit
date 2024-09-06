import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color } from "@rneui/themed/dist/config";

type RatingProp = {
  starRating: number,
  setStarRating: React.Dispatch<React.SetStateAction<number>>
}

export default function StarRating({starRating, setStarRating}: RatingProp) {
  return (
    <View>
      <Text style={{color:"#FAF9F6"}}>Rate your workout:</Text>
      <View style={{ flex: 1, flexDirection: "row", gap: 3, margin:2, marginBottom:7
      }}>
      <TouchableOpacity onPress={() => setStarRating((prevValue)=> prevValue === 0 ? 1 : prevValue === 1 ? 0 : prevValue-prevValue+1)}>
        <Ionicons
          name={starRating >= 1 ? "star": "star-outline"}
          size={24}
          color='#ffb300'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStarRating(2)}>
        <Ionicons
          name={starRating >= 2 ? "star": "star-outline"}
          size={24}
          color='#ffb300'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStarRating(3)}>
        <Ionicons
          name={starRating >= 3 ? "star": "star-outline"}
          size={24}
          color='#ffb300'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStarRating(4)}>
        <Ionicons
          name={starRating >= 4 ? "star": "star-outline"}
          size={24}
          color='#ffb300'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStarRating(5)}>
        <Ionicons
          name={starRating >= 5 ? "star": "star-outline"}
          size={24}
          color='#ffb300'
        />
      </TouchableOpacity>
    </View>
    </View>
    
  );
}

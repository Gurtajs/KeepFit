import {ScrollView, Text, View} from 'react-native'
import Header from './Header'
import Footer from './Footer'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '@/app';
type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

export default function Meals({ navigation }: Props) {
  return(
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
    <ScrollView>
    <Header />
    <Text style={{ fontSize: 16, marginLeft: 10, color: "#FAF9F6" }}>Here are your meals:</Text>
    </ScrollView>
     <Footer navigation={navigation} />
   </View>
  )
}

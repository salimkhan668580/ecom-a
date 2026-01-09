import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import ProductCard from "../Home/product/ProductCard";
import { products } from "../Home/HomeScreen";
import { NavigationProp ,useNavigation} from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";
import { Entypo } from "@expo/vector-icons";


export default function Wishlist() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView className="flex-1 bg-background py-10" showsVerticalScrollIndicator={false}> 
      <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4"
            >
              <Entypo name="chevron-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-normal-text text-3xl font-bold">
              Wishlist
            </Text>
          </View>
          <Text className="text-secondary-text text-base ml-10">
            View and track your wishlist
          </Text>
        </View>
        <View className="px-6 mb-6">
            
            <View className="flex-row flex-wrap justify-between">
                {products.map((product) => (
                    <ProductCard
                     key={product.id} {...product} onPress={() => {
                        navigation.navigate("ProductDetails", { productId: product.id });
                     }} />
                ))}
            </View>
        </View>
    </ScrollView>
  );
}

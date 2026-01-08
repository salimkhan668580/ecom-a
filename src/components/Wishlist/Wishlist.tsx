import { Text, View } from "react-native";
import ProductCard from "../Home/product/ProductCard";
import { products } from "../Home/HomeScreen";
import { NavigationProp ,useNavigation} from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNevigation";


export default function Wishlist() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 pt-14 bg-background"> 
        <View className="px-6 mb-6">
            <Text className="text-normal-text text-xl font-semibold mb-4">
                Wishlist
            </Text>
            <View className="flex-row flex-wrap justify-between">
                {products.map((product) => (
                    <ProductCard
                     key={product.id} {...product} onPress={() => {
                        navigation.navigate("ProductDetails", { productId: product.id });
                     }} />
                ))}
            </View>
        </View>
    </View>
  );
}

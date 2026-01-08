import { Entypo } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNevigation";

type DetailsHeaderProps = {
    title: string;
    subtitle: string;
}

function DetailsHeader({ title, subtitle }: DetailsHeaderProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center mb-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4"
            >
              <Entypo name="chevron-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-normal-text text-3xl font-bold">
              {title}
            </Text>
          </View>
          <Text className="text-secondary-text text-base ml-10">
            {subtitle}
          </Text>
        </View>
    )

}

export default DetailsHeader;
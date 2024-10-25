import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { NativeWindStyleSheet } from "nativewind"; 
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


NativeWindStyleSheet.setOutput({
  default: "native",
});



export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
   <SafeAreaView className="bg-primary h-full justify-center items-center px-4">
    <ScrollView contentContainerStyle={{ height: '100%' }}>
      <View className="w-full min-h-[85vh} justify-center items-center">
        <Image
          source={images.logo}
          className="w-[130px] h-[84]"
          resizeMode="contain"/>
        <Image
          source={images.cards}
          className="max-w-[300px] w-full h-[300px]"
          resizeMode="contain"/>  
      </View>
      <View className="relative mt-5">
        <Text className="text-3xl text-white font-bold text-center">
          Discover Endless Possibilities with {''}
          <Text className="text-secondary-200">Aora</Text>
        </Text>
        <Image
          source={images.path}
          className="absolute w-[136px] h-[15px] -bottom-2 left-[75%] "
          />
      </View> 
        <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Where creativity meets innovation:
          embark on a journey of limitless exploration with Aora</Text> 
      <CustomButton title="Continue with Email"
      handlePress={() => router.push('/sign-in')}
      containerStyles="mt-7 w-full"/>    
    </ScrollView>
    <StatusBar backgroundColor='#161622'
    style='light'/>
   </SafeAreaView>
  );
}


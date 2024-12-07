import { View, Text, FlatList, Image, RefreshControl, Alert  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeWindStyleSheet } from "nativewind"; 

import { images } from '../../constants'
import Searchinput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

NativeWindStyleSheet.setOutput({
  default: "native",
});


const Home = () => {

  const { data: posts, refetch } = useAppwrite(getAllPosts);

 const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  console.log(posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item}) => (
          <VideoCard video={item}/>
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">JSMastery</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <Searchinput/>

            <View className="w-full fle-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}/>

            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
          title="No videos found"
          subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home
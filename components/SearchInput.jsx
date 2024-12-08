import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery ?? '');

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return Alert.alert(
        'Missing query',
        'Please input to search results across database',
      );
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query: trimmedQuery });
    } else {
      router.push(`/search/${trimmedQuery}`);
    }
  };

  return (
    <View className='border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 items-center flex-row space-x-4'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular focus:border-secondary'
        value={query}
        placeholder='Search for a video topic'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={handleSearch}
        accessibilityLabel='Search button'
      >
        <Image
          source={icons.search}
          className='w-6 h-6'
          resizeMode='contain'
          accessibilityLabel='Search icon'
          aria-hidden='true'
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, { useState } from 'react';
// import { NativeWindStyleSheet } from 'nativewind';
// import { icons } from '../constants';
// import { router, usePathname } from 'expo-router';

// NativeWindStyleSheet.setOutput({
//   default: 'native',
// });

// const Searchinput = ({ initialQuery }) => {
//   const pathname = usePathname();
//   const [query, setQuery] = useState(initialQuery || '');
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <View
//       className='border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100
//        focus:border-secondary items-center flex-row space-x-4'
//     >
//       <TextInput
//         className='text-base mt-0.5 text-white flex-1 font-pregular'
//         value={query}
//         placeholder='Search for a video topic'
//         placeholderTextColor='#CDCDE0'
//         onChangeText={(e) => setQuery(e)}
//       />

//       <TouchableOpacity
//         onPress={() => {
//           if (!query) {
//             return Alert.alert(
//               'Missing query',
//               'Please input to search results across database',
//             );
//           }
//           if (pathname.startsWith('/search')) router.setParams({ query });
//           else router.push(`/search/${query}`);
//         }}
//       >
//         <Image source={icons.search} className='w-6 h-6' resizeMode='contain' />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Searchinput;

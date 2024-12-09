import { View, Text } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;

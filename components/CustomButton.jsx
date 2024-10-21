import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
  });

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl min-h-[62px] max-w-[650px] items-center justify-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    disabled={isLoading}
    >

      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
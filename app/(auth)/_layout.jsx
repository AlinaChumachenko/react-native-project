import { View, Text } from 'react-native'
import React from 'react'
import { NativeWindStyleSheet } from "nativewind"; 

NativeWindStyleSheet.setOutput({
  default: "native",
});

const AuthLayout = () => {
  return (
    <View>
      <Text>AuthLayout</Text>
    </View>
  )
}

export default AuthLayout
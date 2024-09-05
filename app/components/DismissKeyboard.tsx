import React, { FC, ReactNode } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}


const DismissKeyboard: FC<DismissKeyboardProps> = ({children}) => {
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
  );
}

export default DismissKeyboard



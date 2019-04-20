import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

const TouchableFeedback = ({ background, children, ...props }) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity {...props}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.Ripple(background, true)}
    >
      {children}
    </TouchableNativeFeedback>
  );
};

TouchableFeedback.defaultProps = {
  background: '#CCCCCC'
};

export default TouchableFeedback;
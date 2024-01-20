import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';

import Svg, {Path, Defs, G} from 'react-native-svg';

const LogoViewer = ({Logosource, containerstyle, logostyle}) => {
  return (
    <View style={containerstyle}>
      <Logosource
        height={logostyle.height}
        width={logostyle.width}
        fill={logostyle.fill}
      />
    </View>
  );
};

export default LogoViewer;

import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../styles/commonStyles';
export default function WrapperContainer({
  children,
  bottom = false,
}: {
  children: React.ReactNode;
  bottom?: boolean;
}) {
  return (
    <SafeAreaView
      edges={bottom ? ['top', 'bottom'] : ['top']}
      style={commonStyles.page}
    >
      <StatusBar barStyle="dark-content" />
      <View style={commonStyles.flex}>{children}</View>
    </SafeAreaView>
  );
}

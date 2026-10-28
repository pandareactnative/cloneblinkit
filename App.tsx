import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import SplashScreen from './src/Components/SplashScreen';
import {hideSplash} from './hideSplash';

export default function App() {
  const [starting, setStarting] = useState(true);
  const layoutReady = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onLayout = useCallback(() => {
    if (layoutReady.current) return;
    layoutReady.current = true;
    // Keep the native poster until the matching React view has been drawn.
    requestAnimationFrame(() => {
      hideSplash();
      timer.current = setTimeout(() => setStarting(false), 650);
    });
  }, []);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <SafeAreaProvider>
      <View onLayout={onLayout} style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Routes />
        {starting && <SplashScreen />}
        {starting && <StatusBar barStyle="dark-content" />}
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});

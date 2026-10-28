import {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export default function useCarousel(length: number, onAdvance: () => void) {
  const focused = useIsFocused();
  const [active, setActive] = useState(AppState.currentState !== 'background');
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state =>
      setActive(state === 'active'),
    );
    return () => subscription.remove();
  }, []);
  useEffect(() => {
    if (!focused || !active || dragging || length < 2) return;
    const timer = setInterval(onAdvance, 4200);
    return () => clearInterval(timer);
  }, [active, dragging, focused, length, onAdvance]);
  return setDragging;
}

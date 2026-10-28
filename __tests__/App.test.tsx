import React from 'react';
import ReactTestRenderer, {act} from 'react-test-renderer';
import {View} from 'react-native';
import App from '../App';
import Routes from '../src/navigation/Routes';
import SplashScreen from '../src/Components/SplashScreen';
import {hideSplash} from '../hideSplash';

jest.mock('../src/navigation/Routes', () => () => null);
jest.mock('../hideSplash', () => ({
  hideSplash: jest.fn().mockResolvedValue(undefined),
}));
let app: ReactTestRenderer.ReactTestRenderer;
beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});
afterEach(async () => {
  await act(() => app.unmount());
  jest.useRealTimers();
});
test('Home mounts behind the white splash before the native launch screen is dismissed', async () => {
  await act(() => {
    app = ReactTestRenderer.create(<App />);
  });
  expect(app.root.findAllByType(Routes)).toHaveLength(1);
  expect(app.root.findAllByType(SplashScreen)).toHaveLength(1);
  expect(hideSplash).not.toHaveBeenCalled();
  await act(() =>
    app.root
      .findAllByType(View)
      .find(node => node.props.onLayout)!
      .props.onLayout(),
  );
  await act(async () => jest.advanceTimersByTime(20));
  expect(hideSplash).toHaveBeenCalledTimes(1);
  await act(async () => jest.advanceTimersByTime(650));
  expect(app.root.findAllByType(SplashScreen)).toHaveLength(0);
  await act(() => app.update(<App />));
  expect(app.root.findAllByType(SplashScreen)).toHaveLength(0);
});

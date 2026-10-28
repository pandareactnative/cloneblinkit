import React, {useId} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Line,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

export function SkyBackground({diwali = false}: {diwali?: boolean}) {
  const id = useId();
  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width="100%"
      height="100%"
      viewBox="0 0 375 520"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Defs>
        <RadialGradient id={id}>
          <Stop
            offset="0"
            stopColor={diwali ? '#dc4769' : '#3695b6'}
            stopOpacity=".4"
          />
          <Stop
            offset="1"
            stopColor={diwali ? '#81002f' : '#08475e'}
            stopOpacity="0"
          />
        </RadialGradient>
      </Defs>
      <Rect width="375" height="520" fill={diwali ? '#82002f' : '#08475e'} />
      <Ellipse cx="330" cy="20" rx="160" ry="100" fill={`url(#${id})`} />
      <Ellipse cx="30" cy="290" rx="220" ry="55" fill={`url(#${id})`} />
      <Ellipse cx="290" cy="400" rx="160" ry="140" fill={`url(#${id})`} />
      {diwali && <FairyLights y={8} />}
    </Svg>
  );
}
export function GlassBackground({tint = '#fffdf6'}: {tint?: string}) {
  const id = useId();
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id={id}>
            <Stop offset="0" stopColor="#ffe7d3" stopOpacity=".55" />
            <Stop offset="1" stopColor="#fff" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={tint} fillOpacity=".95" />
        <Ellipse cx="25%" cy="85%" rx="55%" ry="95%" fill={`url(#${id})`} />
        <Ellipse
          cx="82%"
          cy="0"
          rx="50%"
          ry="70%"
          fill="#edf5eb"
          fillOpacity=".24"
        />
      </Svg>
    </View>
  );
}
export function FairyLights({y = 0}: {y?: number}) {
  return (
    <G>
      {Array.from({length: 19}, (_, index) => {
        const x = index * 21;
        const drop = 5 + (index % 2) * 4;
        return (
          <G key={index}>
            <Path
              d={`M${x - 10} ${y}Q${x} ${y + drop} ${x + 10} ${y}`}
              stroke="#d6aa55"
              strokeWidth=".65"
              fill="none"
            />
            <Line
              x1={x}
              y1={y + drop / 2}
              x2={x}
              y2={y + drop + 3}
              stroke="#d6aa55"
              strokeWidth=".6"
            />
            <Circle
              cx={x}
              cy={y + drop + 5}
              r="6"
              fill="#ffe6a6"
              opacity=".08"
            />
            <Circle
              cx={x}
              cy={y + drop + 5}
              r="3"
              fill="#ffe6a6"
              opacity=".22"
            />
            <Circle cx={x} cy={y + drop + 5} r="1.5" fill="#fff4c9" />
          </G>
        );
      })}
    </G>
  );
}
export function Moon() {
  const id = useId();
  return (
    <Svg width="100%" height="100%" viewBox="0 0 90 90" pointerEvents="none">
      <Defs>
        <RadialGradient id={id}>
          <Stop offset="0" stopColor="#fff9d7" stopOpacity=".7" />
          <Stop offset=".6" stopColor="#fff9d7" stopOpacity=".2" />
          <Stop offset="1" stopColor="#fff9d7" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="45" cy="45" r="44" fill={`url(#${id})`} />
      <Circle cx="45" cy="45" r="26" fill="#fffde3" />
      <Path
        d="M50 19A26 26 0 0 1 50 71A36 36 0 0 0 50 19"
        fill="#e9d99a"
        opacity=".65"
      />
      <Circle cx="38" cy="35" r="6" fill="#f5efd5" opacity=".5" />
      {[
        [57, 36],
        [62, 46],
        [57, 55],
      ].map(([x, y]) => (
        <Path
          key={`${x}-${y}`}
          d={`M${x} ${y - 2}L${x + 2} ${y}L${x} ${y + 2}L${x - 2} ${y}Z`}
          stroke="#e5d275"
          fill="none"
        />
      ))}
    </Svg>
  );
}
export function ScallopedEdge({
  color = '#0c526a',
  gold = false,
}: {
  color?: string;
  gold?: boolean;
}) {
  const path =
    'M0 0H375V6' +
    Array.from(
      {length: 8},
      (_, i) => `Q${375 - i * 47 - 23} 29 ${375 - (i + 1) * 47} 6`,
    ).join('') +
    'L0 0Z';
  return (
    <Svg
      width="100%"
      height="18"
      viewBox="0 0 375 28"
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Path
        d={path}
        fill={color}
        stroke={gold ? '#d2be7b' : '#2086a2'}
        strokeWidth="1"
      />
      <Path
        d={path}
        fill="none"
        stroke="#ead588"
        strokeWidth=".9"
        strokeDasharray="1 3"
      />
    </Svg>
  );
}
export function DiamondBorder({color = '#ffe6be'}: {color?: string}) {
  return (
    <Svg width="100%" height="13" viewBox="0 0 375 13" pointerEvents="none">
      {Array.from({length: 38}, (_, i) => (
        <Path
          key={i}
          d={`M${i * 10 + 3} 3L${i * 10 + 6} 6L${i * 10 + 3} 9L${i * 10} 6Z`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      ))}
    </Svg>
  );
}

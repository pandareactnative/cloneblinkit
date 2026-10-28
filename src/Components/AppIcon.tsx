import React from 'react';
import Svg, {Circle, Path, Rect, Line} from 'react-native-svg';

type Props = {
  name:
    | 'bag'
    | 'diya'
    | 'party'
    | 'headphones'
    | 'beauty'
    | 'home'
    | 'grid'
    | 'printer'
    | 'wallet'
    | 'sound';
  size?: number;
  color?: string;
  selected?: boolean;
};
export default function AppIcon({
  name,
  size = 24,
  color = '#252a28',
  selected = false,
}: Props) {
  const fill = selected ? '#f6d34a' : 'none';
  let drawing: React.ReactNode;
  switch (name) {
    case 'bag':
      drawing = (
        <>
          <Path
            d="M3 12Q3 9 6 10L7 11L11 9L15 11L19 9L21 11V22Q21 24 19 24H5Q3 24 3 22Z"
            fill={selected ? color : 'none'}
          />
          <Path d="M6 10V5Q6 2 8 2Q10 2 10 5V10M15 10V3H19V10" fill={fill} />
        </>
      );
      break;
    case 'diya':
      drawing = (
        <>
          <Path d="M2 16Q12 12 22 16Q21 25 12 25Q3 25 2 16Z" fill={fill} />
          <Path d="M3 16Q12 21 21 16M12 12Q5 9 12 3Q19 9 12 12Z" />
          <Path d="M20 3V7M18 5H22M4 6L6 8L4 10L2 8Z" strokeWidth="1.2" />
        </>
      );
      break;
    case 'party':
      drawing = (
        <>
          <Path
            d="M12 2C9 7 2 9 2 16C2 21 7 22 11 19L9 25H15L13 19C17 22 22 21 22 16C22 9 15 7 12 2Z"
            fill={fill}
          />
          <Path d="M21 1V5M19 3H23" strokeWidth="1" />
        </>
      );
      break;
    case 'headphones':
      drawing = (
        <>
          <Path
            d="M3 18V13C3 0 21 0 21 13V18M6 14Q3 14 3 17V22Q3 25 6 25H7V14ZM18 14Q21 14 21 17V22Q21 25 18 25H17V14Z"
            fill={fill}
          />
        </>
      );
      break;
    case 'beauty':
      drawing = (
        <>
          <Path
            d="M3 15H10V25H3ZM4 15V9H9V15M4 9V3H8V9M15 14H21V25H15ZM16 14V10L13 2H23L20 10V14"
            fill={fill}
          />
        </>
      );
      break;
    case 'home':
      drawing = (
        <>
          <Path d="M3 11L12 3L21 11V24H15V17Q12 13 9 17V24H3Z" fill={fill} />
          <Path d="M16 6V1Q20 1 20 4V9" />
        </>
      );
      break;
    case 'grid':
      drawing = (
        <>
          {[
            [6, 6],
            [18, 6],
            [6, 20],
            [18, 20],
          ].map(([x, y]) => (
            <Rect
              key={`${x}-${y}`}
              x={x - 4}
              y={y - 4}
              width="8"
              height="8"
              rx="4"
              fill={fill}
            />
          ))}
        </>
      );
      break;
    case 'printer':
      drawing = (
        <>
          <Rect x="2" y="9" width="21" height="16" rx="5" fill={fill} />
          <Path d="M6 9V2H19V9M7 17H18M7 21H18" />
          <Circle cx="19" cy="13" r=".8" fill={color} />
        </>
      );
      break;
    case 'wallet':
      drawing = (
        <>
          <Path
            d="M3 9V5Q3 2 7 2H20V9M5 9H21Q24 9 24 12V22Q24 25 21 25H5Q1 25 1 22V12Q1 9 5 9Z"
            fill={fill}
          />
          <Path d="M18 14H24V21H18Q15 17 18 14Z" />
        </>
      );
      break;
    case 'sound':
      drawing = (
        <>
          {[12, 20, 25, 18, 10].map((height, index) => (
            <Line
              key={index}
              x1={3 + index * 5}
              y1={(27 - height) / 2}
              x2={3 + index * 5}
              y2={(27 + height) / 2}
              strokeWidth="2.7"
              stroke={selected && index < 3 ? '#56a45f' : color}
            />
          ))}
        </>
      );
      break;
  }
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 26 28"
      fill="none"
      stroke={color}
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      pointerEvents="none"
    >
      {drawing}
    </Svg>
  );
}

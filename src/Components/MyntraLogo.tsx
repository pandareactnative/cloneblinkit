import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {size?: number};
export default function MyntraLogo({size = 30}: Props) {
  return (
    <Svg
      width={size}
      height={size * 0.76}
      viewBox="0 0 96 73"
      accessibilityLabel="Myntra"
    >
      <Path
        d="M9 66C-1 61 14 21 24 8C28 2 34 4 39 16L24 53C19 67 13 70 9 66Z"
        fill="#ed1ab0"
      />
      <Path
        d="M25 8C32-1 41 24 49 42C53 51 50 64 44 67C34 69 24 23 25 8Z"
        fill="#ff9229"
      />
      <Path
        d="M45 66C36 60 51 25 64 8C69 1 75 7 71 20L58 56C54 66 50 70 45 66Z"
        fill="#f2550c"
      />
      <Path
        d="M65 8C72 0 87 41 92 57C96 70 83 75 75 60L62 26C59 17 60 11 65 8Z"
        fill="#ed18aa"
      />
    </Svg>
  );
}

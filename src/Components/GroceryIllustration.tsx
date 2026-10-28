import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Path,
  Rect,
  Text as SvgText,
  TSpan,
} from 'react-native-svg';
export default function GroceryIllustration({
  location = false,
}: {
  location?: boolean;
}) {
  return location ? (
    <Svg width="100%" height="100%" viewBox="0 0 375 142">
      <Rect width="375" height="142" fill="#f3f4fb" />
      {Array.from({length: 15}, (_, i) => (
        <G key={i} opacity=".23">
          <Rect
            x={i * 27}
            y={40 + (i % 4) * 7}
            width="21"
            height={102 - (i % 4) * 7}
            fill="#d6dde3"
          />
          {Array.from({length: 5}, (_row, j) => (
            <Path
              key={j}
              d={`M${i * 27 + 4} ${54 + j * 11}H${i * 27 + 17}`}
              stroke="#f3f4fb"
              strokeWidth="4"
            />
          ))}
        </G>
      ))}
      <Circle
        cx="184"
        cy="72"
        r="46"
        stroke="#e7e9ef"
        strokeWidth="2"
        fill="none"
      />
      <Ellipse cx="187" cy="133" rx="49" ry="4" fill="#e7e9ed" />
      <Path
        d="M187 126C172 108 157 96 157 77C157 37 217 37 217 77C217 96 202 111 187 126Z"
        fill="#31850e"
      />
      <Circle cx="187" cy="76" r="12" fill="#f3f4fb" />
    </Svg>
  ) : (
    <Svg width="100%" height="100%" viewBox="0 0 300 200">
      <Ellipse cx="151" cy="180" rx="107" ry="9" fill="#e9eadc" />
      <Path
        d="M110 67L93 16Q91 7 103 14L118 52L116 6Q118-5 127 8L131 64M170 64L183 19Q186 7 193 20L187 50L207 11Q215 3 218 16L194 66"
        fill="#49a746"
      />
      <Ellipse cx="150" cy="61" rx="30" ry="25" fill="#f6d940" />
      <Path d="M122 76L112 39L100 44L104 77" fill="#ed8137" />
      <Rect x="91" y="71" width="110" height="108" rx="3" fill="#f2cd3e" />
      <Path d="M91 71H107V179H91Z" fill="#ddba2e" />
      <Path d="M91 71L100 82L107 71H201" fill="#ffda4d" />
      <SvgText x="130" y="132" fontSize="24" fontWeight="900" fill="#101d13">
        blink<TSpan fill="#3b8f25">it</TSpan>
      </SvgText>
      <Rect x="60" y="89" width="27" height="88" rx="5" fill="#e2eff5" />
      <Rect x="64" y="80" width="19" height="12" rx="2" fill="#3e8c1e" />
      <Rect x="61" y="116" width="26" height="25" fill="#23913b" />
      <Rect x="35" y="121" width="23" height="55" rx="4" fill="#e9422f" />
      <Rect x="34" y="115" width="25" height="8" fill="#ee9e32" />
      <Path d="M208 116L217 105H239L249 116V177H208Z" fill="#edf2e7" />
      <Rect x="210" y="130" width="37" height="27" fill="#528f2d" />
      <Ellipse cx="203" cy="164" rx="17" ry="19" fill="#72aa3f" />
      <Path
        d="M201 144Q198 133 209 135"
        stroke="#3e6f2b"
        strokeWidth="4"
        fill="none"
      />
      <Path d="M201 145Q214 130 219 140Q211 149 201 145Z" fill="#438c38" />
    </Svg>
  );
}

import {
  WiRainWind,
  WiSnow,
  WiCloudy,
  WiShowers,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiRain,
  WiThunderstorm,
  WiSnowWind,
  WiSprinkle,
  WiSleet
} from 'react-icons/wi';

export const getWeatherSymbol = weatherSymbol => {
  switch (weatherSymbol) {
    case 1:
      return WiDaySunny;
    case 2:
      return WiDaySunnyOvercast;
    case 3:
      return WiCloudy;
    case 4:
      return WiDaySunnyOvercast;
    case 5:
      return WiCloudy;
    case 6:
      return WiDaySunnyOvercast;
    case 7:
      return WiFog;
    case 8:
      return WiSprinkle;
    case 9:
      return WiRain;
    case 10:
      return WiRain;
    case 11:
      return WiThunderstorm;
    case 12:
      return WiShowers;
    case 13:
      return WiShowers;
    case 14:
      return WiShowers;
    case 15:
      return WiSnow;
    case 16:
      return WiSnow;
    case 17:
      return WiSnowWind;
    case 18:
      return WiShowers;
    case 19:
      return WiShowers;
    case 20:
      return WiRainWind;
    case 21:
      return WiThunderstorm;
    case 22:
      return WiSleet;
    case 23:
      return WiSleet;
    case 24:
      return WiSleet;
    case 25:
      return WiSnow;
    case 26:
      return WiSnow;
    case 27:
      return WiSnow;
  }
};

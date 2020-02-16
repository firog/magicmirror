import * as SunCalc from 'suncalc';

export const getSunTime = (date, lat = 59.8586, long = 17.6389) => {
  const sunTimesData = SunCalc.getTimes(new Date(date), lat, long, true);
  return sunTimesData;
};

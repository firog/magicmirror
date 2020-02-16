import { PointForecasts, TimeSeries } from '../../../interfaces/pointForecasts';
import { PointForecast } from '../../../interfaces/pointForecast';
import { PrecipitationCategory } from '../../../enums/precipitationEnum';
import { ForecastDay } from '../../../interfaces/forecastDay';
import { getSunTime } from '../../../utils/sunTimeCalc';

const getWeekDay = day => {
  switch (day) {
    case 0:
      return 'Söndag';
    case 1:
      return 'Måndag';
    case 2:
      return 'Tisdag';
    case 3:
      return 'Onsdag';
    case 4:
      return 'Torsdag';
    case 5:
      return 'Fredag';
    case 6:
      return 'Lördag';
  }
};

export const allForecastsReducer = (foreCasts: PointForecasts) => {
  let mappedForecasts: PointForecast[] = [];
  foreCasts.timeSeries.map(t => {
    const temperature = getNamedParameter(t, 't', 'Cel');
    const windSpeed = getNamedParameter(t, 'ws', 'm/s');
    const precipitationCategory = getNamedParameter(t, 'pcat');
    const weatherSymbol = getNamedParameter(t, 'Wsymb2');
    console.log(foreCasts);
    const latitude = foreCasts.geometry.coordinates[0][1];
    const longitude = foreCasts.geometry.coordinates[0][0];
    const sunTimeData = getSunTime(
      new Date(t.validTime),
      parseInt(latitude, 10),
      parseInt(longitude, 10)
    );

    console.log(foreCasts);

    const sunrise = `${sunTimeData.sunrise.getHours()}:${sunTimeData.sunrise.getMinutes()}`;
    const sunset = `${sunTimeData.sunset.getHours()}:${sunTimeData.sunset.getMinutes()}`;
    console.log(sunrise);

    mappedForecasts.push({
      longitude: foreCasts.geometry.coordinates[0][0],
      latitude: foreCasts.geometry.coordinates[0][1],
      temperature,
      windSpeed,
      time: t.validTime,
      weatherSymbol,
      precipitationCategory:
        PrecipitationCategory[parseInt(precipitationCategory)],
      sunset,
      sunrise
    } as PointForecast);
  });

  let mappedDaysWithTime = [{} as ForecastDay];

  for (let i = 0; i < mappedForecasts.length; i++) {
    let formattedDate = splitDate(mappedForecasts[i].time);
    let currentDate = formattedDate.date;

    let existingDate = mappedDaysWithTime.find(x => x.day === currentDate);

    if (!existingDate) {
      mappedDaysWithTime.push({
        day: currentDate,
        weekDay: formattedDate.weekDay,
        hours: []
      });
      existingDate = mappedDaysWithTime.find(x => x.day === currentDate);
    }

    existingDate.hours.push(mappedForecasts[i]);
  }

  const filteredMappedDaysWithTime = mappedDaysWithTime.filter(x => x.day);
  return filteredMappedDaysWithTime;
};

export const forecastReducer = (foreCast: PointForecasts, hour: string) => {
  const timeSeries = foreCast.timeSeries.find(t => {
    const validTime = new Date(t.validTime);
    return validTime.getHours() === parseInt(hour);
  });

  const temperature = getNamedParameter(timeSeries, 't', 'Cel');

  const windSpeed = getNamedParameter(timeSeries, 'ws', 'm/s');

  const precipitationCategory = getNamedParameter(timeSeries, 'pcat');

  const latitude = foreCast.geometry.coordinates[0][1];
  const longitude = foreCast.geometry.coordinates[0][0];
  const sunTimeData = getSunTime(
    parseInt(latitude, 10),
    parseInt(longitude, 10)
  );

  const sunrise = `${sunTimeData.sunrise.getHours() +
    1}:${sunTimeData.sunrise.getMinutes()}`;
  const sunset = `${sunTimeData.sunset.getHours() +
    1}:${sunTimeData.sunset.getMinutes()}`;
  console.log(sunTimeData);

  return {
    longitude,
    latitude,
    temperature,
    windSpeed,
    time: timeSeries.validTime,
    precipitationCategory:
      PrecipitationCategory[parseInt(precipitationCategory)],
    sunset,
    sunrise
  };
};

const getNamedParameter = (
  timeSeries: TimeSeries,
  name: string = '',
  unit: string = ''
) => {
  if (unit) {
    return timeSeries.parameters.find(t => t.name === name && t.unit === unit)
      .values[0];
  } else {
    return timeSeries.parameters.find(t => t.name === name).values[0];
  }
};

const splitDate = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const dateLocale = date.toLocaleString('sv-SE', {
    timeZone: 'UTC'
  });

  const dateSplit = dateLocale.split(' ');
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const weekDay = getWeekDay(date.getUTCDay());

  return {
    weekDay,
    date: `${day}/${month}`,
    time: dateSplit[1]
  };
};

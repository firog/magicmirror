import { PointForecasts, TimeSeries } from '../../../interfaces/pointForecasts';
import { PointForecast } from '../../../interfaces/pointForecast';
import { PrecipitationCategory } from '../../../enums/precipitationEnum';
import { ForecastDay } from '../../../interfaces/forecastDay';

export const allForecastsReducer = (foreCasts: PointForecasts) => {
  let mappedForecasts: PointForecast[] = [];
  foreCasts.timeSeries.map(t => {
    const temperature = getNamedParameter(t, 't', 'Cel');

    const windSpeed = getNamedParameter(t, 'ws', 'm/s');

    const precipitationCategory = getNamedParameter(t, 'pcat');

    mappedForecasts.push({
      longitude: foreCasts.geometry.coordinates[0][0],
      latitude: foreCasts.geometry.coordinates[0][1],
      temperature,
      windSpeed,
      time: t.validTime,
      precipitationCategory:
        PrecipitationCategory[parseInt(precipitationCategory)]
    } as PointForecast);
  });

  let mappedDaysWithTime = [{} as ForecastDay];

  for (let i = 0; i < mappedForecasts.length; i++) {
    let formattedDate = splitDate(mappedForecasts[i].time);
    let currentDate = formattedDate.date;

    let existingDate = mappedDaysWithTime.find(x => x.day === currentDate);

    if (!existingDate) {
      mappedDaysWithTime.push({ day: currentDate, hours: [] });
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

  return {
    longitude: foreCast.geometry.coordinates[0][0],
    latitude: foreCast.geometry.coordinates[0][1],
    temperature,
    windSpeed,
    time: timeSeries.validTime,
    precipitationCategory:
      PrecipitationCategory[parseInt(precipitationCategory)]
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
  return {
    date: `${day}/${month}`,
    time: dateSplit[1]
  };
};
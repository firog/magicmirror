import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../shared/colors';
import { getWeatherSymbol } from '../utils/getWeatherSymbol';

const TableHeader = styled.th`
  color: ${colors.white};
  text-align: center;
  font-family: times;
  padding-right: 10px;
  background-color: ${props => props.isActive && colors.activeCell};
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  color: ${props => (props.isActive ? colors.activeCell : colors.white)};
  height: 65px;
  width: 100%;
  padding-right: 15px;
  text-align: center;
  background-color: ${props => props.isActive && colors.activeCell};
  transition: background-color 0.5s;
  ${props =>
    props.isSymbol &&
    css`
      font-size: 30px;
    `}

  &:hover {
    background-color: ${colors.activeCell};
  }
`;

export default function DailyForecast({ data }) {
  const WeatherSymbol = getWeatherSymbol(data.hours[0].weatherSymbol);

  const todaysDate = new Date().getUTCDate();
  const dataDate = data.day.split('/');
  const isActive = todaysDate === dataDate;

  return (
    <TableRow>
      <TableHeader scope="row">{data.weekDay}</TableHeader>
      <TableData isSymbol>
        <WeatherSymbol />
      </TableData>
      <TableData>{data.hours[0].temperature}&deg;C</TableData>
      <TableData>{data.hours[0].windSpeed}m/s</TableData>
    </TableRow>
  );
}

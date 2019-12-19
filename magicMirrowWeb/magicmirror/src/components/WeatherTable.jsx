import React from 'react';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import DailyForecast from './DailyForecast';

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  // outline: solid;
  // color: ${colors.white};
`;

const TableHeader = styled.th`
  color: ${colors.white};
  font-family: times     
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
`;

const TableRow = styled.tr``;

export default function WeatherTable(props) {
  const dailyForecasts = props.data.dailyForecasts.slice(0, 4);
  const headers = ['Dag', 'Temperatur', 'Vind', 'Nederbörd'];

  return (
    <Table>
      {/* <thead>
        <TableRow>
          {headers.map((header, i) => {
            return (
              <TableHeader key={i} scope="col">
                {header}
              </TableHeader>
            );
          })}
        </TableRow>
      </thead> */}
      <tbody>
        {dailyForecasts.map((data, i) => {
          return <DailyForecast key={i} data={data}></DailyForecast>;
        })}
      </tbody>
    </Table>
  );
}

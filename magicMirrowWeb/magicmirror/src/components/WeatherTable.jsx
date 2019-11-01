import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  box-sizing: content-box;
  border: 2px #e3e3e3 solid;
  display: table;
  width: 220px;
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableCell = styled.div`
  border: 2px #e3e3e3 solid;
`;

export default function WeatherTable({ data }) {
  return (
    <TableWrapper>
      {data.pointForecasts.map(({ time, temperature, windSpeed }) => (
        <React.Fragment>
          <TableRow key={time}>
            <TableCell>Time: {time}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Temp: {temperature}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Windspeed: {windSpeed}</TableCell>
          </TableRow>
        </React.Fragment>
      ))}
      ;
    </TableWrapper>
  );
}

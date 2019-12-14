import React from 'react';
import styled from 'styled-components';
import { colors } from '../shared/colors';

const Caption = styled.caption`
  font-size: 30px;
  padding-bottom: 20px;
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
`;

// const Table = styled.table`
//   table-layout: fixed;
//   width: 100%;
//   margin: 0;
//   border-spacing: 0;
//   border-collapse: collapse;
// `;

const TableHeader = styled.th`
  color: ${colors.lightBlueGrey};
  font-family: times     
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
`;

const TableRow = styled.tr``;

// const TableHeader = styled.th`
//   font-size: 20px;
//   font-weight: bold;
// `;

const TableData = styled.td`
  color: ${colors.black};
  font-family: 'Press Start 2P', cursive;
  font-size: 25px;
  border: 1px solid ${colors.black};
  height: 65px;
  width: 90px;
  padding-left: 10px;
  text-align: center;
  background-color: ${props => props.isActive && colors.activeCell};
  transition: background-color 0.5s;

  &:hover {
    background-color: ${colors.activeCell};
  }
`;

// a {
//   background-color: powderblue;
//   transition: background-color .5s;
// }

// a:hover {
//   background-color: gold;
// }

// const TableData = styled.td`
//   border: 1px solid ${colors.borderColor};
//   padding: 2px;
//   height: 100%;
//   text-align: center;
//   vertical-align: middle;
// `;
// Add to table data:
// background: ${props.isActive && colors.activeCell};

export default function WeatherTable(props) {
  console.log(props);

  // console.log('data', props);
  // const colHeaders = getColumHeaders();
  return (
    <Table>
      <Caption>Weather data Uppsala</Caption>
      <thead>
        <TableRow>
          <TableHeader scope="col">Dag</TableHeader>
          <TableHeader scope="col">Temperatur</TableHeader>
          <TableHeader scope="col">Nederbörd</TableHeader>
          <TableHeader scope="col">Soluppgång</TableHeader>
          <TableHeader scope="col">Solnedgång</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <TableHeader scope="row">29/11</TableHeader>
          <TableData>5&deg;C</TableData>
          <TableData>5&deg;C</TableData>
          <TableData>08:32</TableData>
          <TableData>16:32</TableData>
        </TableRow>
        <TableRow>
          <TableHeader scope="row">1/12</TableHeader>
          <TableData>6&deg;C</TableData>
          <TableData isActive>6&deg;C</TableData>
          <TableData>08:32</TableData>
          <TableData>16:32</TableData>
        </TableRow>
        <TableRow>
          <TableHeader scope="row">2/12</TableHeader>
          <TableData>6&deg;C</TableData>
          <TableData>6&deg;C</TableData>
          <TableData>08:32</TableData>
          <TableData>16:32</TableData>
        </TableRow>
        <TableRow>
          <TableHeader scope="row">3/12</TableHeader>
          <TableData>6&deg;C</TableData>
          <TableData>6&deg;C</TableData>
          <TableData>08:32</TableData>
          <TableData>16:32</TableData>
        </TableRow>
      </tbody>
    </Table>
  );
}

// export default function WeatherTable({ data }) {
//   return (
//     <RootContainer>
//       {data.pointForecasts.map(({ time, temperature, windSpeed }) => (
//         <React.Fragment>
//           <Header key={time}>Test</Header>
//           <Row>
//             <TableCell>Time: {time} </TableCell>
//           </Row>
//           <Row>
//             <TableCell>Temp: {temperature} </TableCell>
//           </Row>
//           <Row>
//             <TableCell>Windspeed: {windSpeed} </TableCell>
//           </Row>
//         </React.Fragment>
//       ))}
//       ;
//     </RootContainer>
//   );
// }

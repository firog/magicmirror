import React from 'react';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import TrainInfo from './TrainInfo';

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

export default function TrainInfoTable(props) {
  const { lateTrains } = props.data;
  console.log(props);
  const headers = ['Avgångstid', 'Från', 'Till', 'Direkttåg', 'Spår'];

  return (
    <Table>
      <thead>
        <TableRow>
          {headers.map((header, i) => {
            return (
              <TableHeader key={i} scope="col">
                {header}
              </TableHeader>
            );
          })}
        </TableRow>
      </thead>
      <tbody>
        {lateTrains.map((lateTrain, i) => {
          return <TrainInfo key={i} lateTrain={lateTrain}></TrainInfo>;
        })}
      </tbody>
    </Table>
  );
}

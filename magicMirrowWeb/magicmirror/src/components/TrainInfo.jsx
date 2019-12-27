import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../shared/colors';

const TableRow = styled.tr``;

const TableData = styled.td`
  color: ${props => (props.isActive ? colors.activeCell : colors.white)};
  height: 65px;
  width: 75px;
  padding-right: 5px;
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

export default function TrainInfo(props) {
  const { lateTrain } = props;
  const {
    departureStation,
    departureTime,
    arrivalStation,
    nonStop,
    track
  } = lateTrain;

  return (
    <TableRow>
      <TableData>{departureTime}</TableData>
      <TableData>{departureStation}</TableData>
      <TableData>{arrivalStation}</TableData>
      <TableData>{nonStop ? 'Ja' : 'Nej'}</TableData>
      <TableData>{track}</TableData>
    </TableRow>
  );
}

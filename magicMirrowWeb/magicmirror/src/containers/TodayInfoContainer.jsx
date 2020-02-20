import React from 'react';
import styled from 'styled-components';
import { colors } from '../shared/colors';

const Wrapper = styled.div`
  position: fixed;
  color: ${colors.white};
  top: 20px;
  left: 50%;
`;

export default function TodayInfoContainer({ client }) {
  return <Wrapper>TEST</Wrapper>;
}

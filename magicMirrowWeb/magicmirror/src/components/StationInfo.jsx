import React from 'react';
import styled from 'styled-components';
import { colors } from '../shared/colors';

const Wrapper = styled.div`
  color: ${colors.white};
  position: fixed;
  right: 0;
  bottom: 0;
`;

const InfoBox = styled.div`
  box-sizing: border-box;
  border: solid ${colors.white} 2px;
  width: 428px;
  height: 302px;
  padding: 5px;
`;

export default function StationInfo(props) {
  const { stationAnnouncement } = props.data;
  return (
    <Wrapper>
      {stationAnnouncement.length > 0 && (
        <InfoBox>{stationAnnouncement}</InfoBox>
      )}
    </Wrapper>
  );
}

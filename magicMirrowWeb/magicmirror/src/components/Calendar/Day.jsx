import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  background-color: gray;
`;

const Content = styled.span`
  display: flex;
  margin-right: 5px;
  margin-left: 5px;
`;

export default function Day() {
  return (
    <Wrapper>
      <Content>4</Content>
    </Wrapper>
  );
}

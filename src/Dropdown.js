import React from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
`;

export default function Dropdown(props) {
  return (
    <DropdownWrapper open={props.open}>
      {props.children}
    </DropdownWrapper>
  );
}

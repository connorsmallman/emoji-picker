import React from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  box-shadow: 0 0.8rem 2.4rem 0 rgba(0,0,0,0.5);
  color: #fff;
  left: 0;
  position: absolute;
  top: 3.8rem;
  transform: ${props => props.open ? 'scale(1, 1)' : 'scale(0, 0)' };
  transform-origin: ${props => props.transformOrigin};
  transition: 0.20s cubic-bezier(0.645, 0.045, 0.355, 1) transform 0.1s;
  width: 100%;
  z-index: 1;
`;

export default function Dropdown(props) {
  return (
    <DropdownWrapper {...props}>
      {props.children}
    </DropdownWrapper>
  );
}

// @flow
import React from 'react';
import styled from 'styled-components';

const Anchor = styled.a`
  background: ${props => props.isActive ? 'green' : props.background};
  display: block;
  border-radius: 10px;
  height: 10px;
  width: 10px;
  position: relative;
`;

const Modifier = (props: { onClick: Function, active: boolean, hex: string }): Object => (
  <Anchor
    onClick={props.onClick}
    isActive={props.active}
    background={props.hex}
  />
);

const modifiers = [
  '#FFDE5C',
  '#FFE1BB',
  '#FFD0A9',
  '#D7A579',
  '#B57D52',
  '#8B6858'
];

const NavItem = styled.p`
  display: inline-block;
  padding: 0 2px;
`;

const Modifiers = (props: { active: boolean, onChange: Function }) => (
  <nav>
    {modifiers.map((hex, key) => (
      <NavItem key={key}>
        <Modifier
          hex={hex}
          type={key}
          active={props.active === key}
          onClick={() => props.onChange(key)}
        />
      </NavItem>
    ))}
  </nav>
);

export default Modifiers;

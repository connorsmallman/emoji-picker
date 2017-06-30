// @flow
import React from 'react';
import styled from 'styled-components';

const Decoration = styled.div`
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
`;

const Title = styled.h2`
  color: #333;
`;

type PropTypes = {
  style: Object,
  category: Object
}

const CategoryHeader = (props: PropTypes) => (
  <div style={props.style}>
    <Title>{props.category.title}</Title>
    <Decoration>{props.headingDecoration}</Decoration>
  </div>
);

export default CategoryHeader;

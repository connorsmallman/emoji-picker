import React, { Component } from 'react';
import emojione from 'emojione';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: 0;

  img,
  svg {
    height: 2rem;
    width: 2rem;
  }
`;

class Trigger extends Component {
  createMarkup() {
    return { __html: emojione.shortnameToImage(this.props.open ? ':upside_down:' : ':relaxed:') };
  }

  render() {
    return (
      <Button onClick={this.props.onClick} dangerouslySetInnerHTML={this.createMarkup(this.props.open)}>
      </Button>
    );
  }
}

export default Trigger;

// @flow
import React, { Component, type Element } from 'react';
import styled from 'styled-components';
import Emoji from './Emoji';

const Row = styled.div`
  box-sizing: border-box;
  overflow-y: hidden;
  padding-left: 10px
`;

type PropTypes = {
  emojis: Array<Object>,
  onChange: Function
}

class EmojiRow extends Component {
  handleEmojiSelect: Function

  constructor(props: PropTypes) {
    super(props);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
  }

  handleEmojiSelect(ev, emoji) {
    this.props.onChange(emoji);
  }

  render(): Element<*> {
    const { emojis, style } = this.props;

    return (
      <Row style={style}>
        {emojis.map(emoji => (
          <Emoji
            {...emoji}
            key={emoji.unicode}
            onSelect={this.handleEmojiSelect}
          />
        ))}
      </Row>
    );
  }
}

export default EmojiRow;

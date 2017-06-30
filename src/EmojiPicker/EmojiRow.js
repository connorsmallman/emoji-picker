import React, { Component } from 'react';
import styled from 'styled-components';
import Emoji from './Emoji';

const Row = styled.div`
  box-sizing: border-box;
  overflow-y: hidden;
  padding-left: 10px
`;

class EmojiRow extends Component {
  constructor(props) {
    super(props);
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this);
  }

  handleEmojiSelect(ev, emoji) {
    this.props.onChange(emoji);
  }

  render() {
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

// @flow
import React, { Component, type Element } from 'react';
import emojione from 'emojione';
import styled from 'styled-components';

const EmojiInner = styled.div`
  display: inline-block;
  padding: 5px;
  border-radius: 4px;
  img {
    width: 22px;
    height: 22px;
  }
`;

type PropTypes = {
  shortname: string,
  aliases: Array<string>,
  aliases_ascii: Array<string>,
  category: string,
  name: string,
  shortcode: string,
  unicode: string,
  unicode_alternates: Array<string>,
  keywords: Array<string>,
  onSelect: Function
};

export default class Emoji extends Component {

  handleClick: Function
  handleKeyUp: Function
  createMarkup: Function

  constructor(props: PropTypes) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  shouldComponentUpdate(nextProps: PropTypes) {
    return nextProps.shortname !== this.props.shortname;
  }

  createMarkup() {
    return { __html: emojione.shortnameToImage(this.props.shortname) };
  }

  handleKeyUp(ev: Event) {
    ev.preventDefault();
    if (ev.key === 'Enter' || ev.key === ' ') {
      this.handleClick(ev);
    }
  }

  handleClick(ev: Event) {
    const {
      shortname,
      aliases,
      aliases_ascii,
      category,
      name,
      shortcode,
      unicode,
      unicode_alternates,
      keywords
    } = this.props;

    this.props.onSelect(
      ev,
      shortname,
      aliases,
      aliases_ascii,
      category,
      name,
      shortcode,
      unicode,
      unicode_alternates,
      keywords
    );
  }

  render(): Element<*> {
    return (
      <EmojiInner
        onKeyUp={this.handleKeyUp}
        onClick={this.handleClick}
        tabIndex='0'
        className='emoji'
        title={this.props.name}
        dangerouslySetInnerHTML={this.createMarkup()}
      />
    );
  }
}

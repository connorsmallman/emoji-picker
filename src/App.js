import React, { Component } from 'react';
import EmojiPicker from './Emoji/Picker';
import EmojiTrigger from './Emoji/Trigger';
import Dropdown from './Dropdown';
import styled from 'styled-components';

const EmojiDropdownWrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    height: 2.4rem;
  }

  button {
    position: absolute;
    right: .2rem;
    top: .2rem;
    z-index: 1;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      searchTermIndex: 0,
      messages: '',
      message: '',
      term: ''
    }

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleEmojiChange = this.handleEmojiChange.bind(this);
  }

  updateMessage(message) {
    if (message.includes(':')) {
      // strip any completed shortnames then check for uncomleted
      const match = message
        .replace(new RegExp(/:\w+:/, 'gi'), '')
        .match(new RegExp(/:\w+/), 'gi');

      this.setState({
        term: (match) ? match[0].replace(':', '') : '',
        searchTermIndex: (match) ? message.indexOf(match[0]) : 0,
        open: !!match
      });
    }

    this.setState({ message });
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  submitMessage() {
    this.setState({ messages: `${this.state.messages} ${this.state.message}` });
  }

  handleEmojiChange(shortname) {
    const message = (this.state.searchTermIndex && this.state.term)
      ? this.state.message.replace(`:${this.state.term}`, `${shortname} `)
      : `${this.state.message} ${shortname} `;

    this.setState({ message, searchIndex: 0, term: '', open: false });

    this.messageInput.focus();
  }

  render() {
    return (
      <div>
        <textarea value={this.state.messages}>
        </textarea>
        <div>
          <EmojiDropdownWrapper>
            <Dropdown open={this.state.open} transformOrigin={'right bottom'}>
              <EmojiPicker onChange={this.handleEmojiChange} search={this.state.term}/>
            </Dropdown>
            <input ref={input => this.messageInput = input}  value={this.state.message} type="text" onChange={ev => this.updateMessage(ev.target.value)} />
            <EmojiTrigger onClick={this.toggleDropdown} open={this.state.open}>Open</EmojiTrigger>
          </EmojiDropdownWrapper>
        </div>
        <button type='submit' onClick={this.submitMessage}>Send</button>

      </div>
    );
  }
}

export default App;

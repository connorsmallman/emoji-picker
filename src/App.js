import React, { Component } from 'react';
import EmojiPicker from './EmojiPicker';
import Dropdown from './Dropdown';

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
      const stripped = message.replace(new RegExp(/:\w+:/, 'gi'), '');
      const match = stripped.match(new RegExp(/:\w+/), 'gi');

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
        <input ref={input => this.messageInput = input}  value={this.state.message} type="text" onChange={ev => this.updateMessage(ev.target.value)} />
        <button onClick={this.toggleDropdown}>Open</button>
        </div>
        <button type='submit' onClick={this.submitMessage}>Send</button>
        <Dropdown open={this.state.open}>
          <EmojiPicker onChange={this.handleEmojiChange} search={this.state.term}/>
        </Dropdown>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import EmojiPicker from './EmojiPicker';
import Dropdown from './Dropdown';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      term: ''
    }

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm(term) {
    if (this.state.term === term) {
      return;
    }

    this.setState({ term });
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.updateSearchTerm} />
        <button onClick={this.toggleDropdown}>Open</button>
        <Dropdown open={this.state.open}>
          <EmojiPicker onChange={ev => console.log(ev)}/>
        </Dropdown>
      </div>
    );
  }
}

export default App;

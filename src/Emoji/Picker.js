// @flow
import React, { Component } from 'react';
import Emoji from './Emoji';
import Categories from './Categories';
import styled from 'styled-components';
import createRowsSelector from './createRowsSelector';
import emojis from './emojis';
import defaultCategories from './defaultCategories';

const Dialog = styled.div`
  background: #fff;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const Header = styled.header`
  padding: 0 10px;
  background-color: #F5F7F9;
`;

const NavItem = styled.div`
  display: inline-block;
  box-sizing: border-box;
  height: 42px;
  padding: 9px 5px;
  background: ${props => props.isActive ? '#fff' : '#F5F7F9'};

  svg,
  img {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.input`
  font-size: 12px;
  padding: 6px 4px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

type PropTypes = {
  onChange: Function,
  search: string,
}

export default class Picker extends Component {
  state: {
    modifier: number,
    category: any,
    term: string,
    emojis: Object
  }

  categories: Object

  setFocus: Function
  setCategoriesRef: Function
  updateSearchTerm: Function
  onActiveCategoryChange: Function
  onModifierChange: Function
  rowsSelector: Function

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      modifier: 0,
      category: false,
      term: '',
      emojis: {}
    };

    this.setFocus = this.setFocus.bind(this);
    this.setCategoriesRef = this.setCategoriesRef.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.onActiveCategoryChange = this.onActiveCategoryChange.bind(this);
    this.onModifierChange = this.onModifierChange.bind(this);
  }

  componentWillMount() {
    this.rowsSelector = createRowsSelector();
    this.setState({ emojis });
  }

  componentDidMount() {
    this.setState({ category: this.categories.getActiveCategory() }); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps: PropTypes) {
    this.setState({ term: (nextProps.search !== '') ? nextProps.search : '' });
  }

  setFocus(ev: Event) {
    if (ev.target.id === 'flags') {
      this.categories[this.state.category].children[0].focus();
    }
  }

  setCategoriesRef(categories: Object) {
    this.categories = categories;
  }

  onActiveCategoryChange(category: Object) {
    if (category !== this.state.category) {
      this.setState({ category });
    }
  }

  onModifierChange(modifier: number) {
    this.setState({ modifier });
  }

  updateSearchTerm(term: string) {
    this.setState({ term });
  }

  render() {
    const rows = this.rowsSelector(
      defaultCategories,
      this.state.emojis,
      this.state.modifier,
      this.state.term
    );

    return (
      <Dialog>
        <Header>
          <nav onBlur={this.setFocus}>
            {defaultCategories.map((details, key) => (
              <NavItem key={key} isActive={this.state.category === key}>
                <Emoji
                  id={key}
                  shortname={`:${details.emoji}:`}
                  onSelect={() => this.categories.jumpToCategory(key)}
                />
              </NavItem>
            ))}
          </nav>
        </Header>
        <Search
          type='text'
          onChange={(ev) => this.updateSearchTerm(ev.target.value)}
          autoFocus
        />
        <Categories
          ref={this.setCategoriesRef}
          rows={rows}
          modifier={this.state.modifier}
          onActiveCategoryChange={this.onActiveCategoryChange}
          onChange={this.props.onChange}
          onModifierChange={this.onModifierChange}
          categories={defaultCategories}
        />
      </Dialog>
    );
  }
}

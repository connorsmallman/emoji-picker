// @flow
import React, { Component, type Element } from 'react';
import EmojiRow from './EmojiRow';
import Modifiers from './Modifiers';
import CategoryHeader from './CategoryHeader';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const CATEGORY_HEADER_ROW_HEIGHT = 46;
const EMOJI_ROW_HEIGHT = 32;

type PropTypes = {
  rows: Array<Object>,
  modifier: number,
  onActiveCategoryChange: Function,
  onChange: Function,
  onModifierChange: Function
}

class Categories extends Component {
  lastActiveCategory: string
  categories: Object
  list: Object

  setListRef: Function
  onScroll: Function
  getActiveCategory: Function
  rowHeight: Function
  rowRenderer: Function
  setCategoryRef: Function
  jumpToCategory: Function
  onChange: Function
  onModifierChange: Function

  constructor(props: PropTypes, context: Object) {
    super(props, context);

    this.lastActiveCategory = '';
    this.categories = {};

    this.setListRef = this.setListRef.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getActiveCategory = this.getActiveCategory.bind(this);
    this.rowHeight = this.rowHeight.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.setCategoryRef = this.setCategoryRef.bind(this);
    this.jumpToCategory = this.jumpToCategory.bind(this);
  }

  componentDidUpdate(prevProps: PropTypes) {
    if (
      this.props.rows !== prevProps.rows ||
      this.props.modifier !== prevProps.modifier
    ) {
      this.list.recomputeRowHeights();
    }
  }

  setListRef(list: Object) {
    this.list = list;
  }

  onScroll({ scrollTop }: { scrollTop: number }) {
    const activeCategory = this.getActiveCategory(scrollTop);
    if (activeCategory !== this.lastActiveCategory) {
      this.lastActiveCategory = activeCategory;
      this.props.onActiveCategoryChange(activeCategory);
    }
  }

  getActiveCategory(scrollTop: number = 0): number {
    const { rows } = this.props;

    if (scrollTop === 0) {
      if (!rows.length) return 0;
      return rows[0].id;
    }

    let firstFullyVisibleRowIndex = 0;
    let accumulatedScrollTop = 0;

    while (accumulatedScrollTop < scrollTop) {
      accumulatedScrollTop += this.rowHeight({
        index: firstFullyVisibleRowIndex
      });

      if (accumulatedScrollTop <= scrollTop) {
        firstFullyVisibleRowIndex += 1;
      }
    }

    const currentRow = this.props.rows[firstFullyVisibleRowIndex];

    if (Array.isArray(currentRow)) {
      return currentRow[0].category;
    }

    return currentRow.id;
  }

  rowHeight({ index }: { index: number }) {
    const row = this.props.rows[index];
    return Array.isArray(row) ? EMOJI_ROW_HEIGHT : CATEGORY_HEADER_ROW_HEIGHT;
  }

  rowRenderer({ key, index, style }: { key: number, index: number, style: Object }) {
    const row = this.props.rows[index];
    const { onChange } = this.props;

    if (Array.isArray(row)) {
      return (
        <EmojiRow key={key} onChange={onChange} style={style} emojis={row} />
      );
    }

    const { category, id } = row;
    const attributes = {
      key,
      category,
      onChange,
      ref: this.setCategoryRef(id),
      style
    };

    if (index === 0) {
      const { modifier, onModifierChange } = this.props;

      attributes.headingDecoration = (
        <Modifiers active={modifier} onChange={onModifierChange} />
      );
    }

    return <CategoryHeader {...attributes} />;
  }

  setCategoryRef(id: number) {
    return (category: Object) => {
      this.categories[id] = category;
    };
  }

  jumpToCategory(id: number) {
    const index = this.props.rows.findIndex(category => category.id === id);
    this.list.scrollToRow(index);
  }

  render(): Element<*> {
    const rowCount = this.props.rows.length;

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            height={500}
            onScroll={this.onScroll}
            ref={this.setListRef}
            rowCount={rowCount}
            rowHeight={this.rowHeight}
            rowRenderer={this.rowRenderer}
            scrollToAlignment='start'
            tabIndex={null}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}

export default Categories;

function chunk(array: Array<*>, size: number): Array<Array<*>> {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
}

function rowsSelector(
  categories: Array<Object>,
  emojisByCategory: Array<Object>,
  modifier: number,
  term: string
): Array<*> {
  const findEmojiVariant = (emojis: Array<Object>): any =>
    (modifier && emojis[modifier]) ? emojis[modifier] : emojis[0];
  const searchTermRegExp = new RegExp(`^(?:.* +)*${escape(term)}`, 'i');
  const emojiMatchesSearchTerm = (emoji: Object): boolean =>
    emoji.keywords
      .concat(emoji.name)
      .some((keyword: string): boolean => searchTermRegExp.test(keyword));

  return categories.map((category, id) => {
    const { key } = category;
    const list = emojisByCategory[key] || {};
    let emojis = Object.keys(list).map(k => list[k]).map(findEmojiVariant);

    if (term) {
      emojis = emojis.filter(emojiMatchesSearchTerm);
    }

    return {
      category,
      emojis,
      id
    };
  })
  .filter(({ emojis }) => emojis.length > 0)
  .map(({ category, emojis, id }) => [
    {
      category,
      id
    },
    ...chunk(emojis, 8)
  ])
  .reduce(
    (rows, categoryAndEmojiRows) => [...rows, ...categoryAndEmojiRows],
    []
  );
}

export default function createRowsSelector() {
  let lastCategories;
  let lastEmojisByCategory;
  let lastModifier;
  let lastTerm;
  let lastResult;

  return function memoizedRowsSelector(
    categories,
    emojisByCategory,
    modifier,
    term
  ) {
    if (
      categories !== lastCategories ||
        emojisByCategory !== lastEmojisByCategory ||
        modifier !== lastModifier ||
        term !== lastTerm
    ) {
      lastResult = rowsSelector(
        categories,
        emojisByCategory,
        modifier,
        term
      );
      lastCategories = categories;
      lastEmojisByCategory = emojisByCategory;
      lastModifier = modifier;
      lastTerm = term;
    }

    return lastResult;
  };
}

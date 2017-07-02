import strategy from 'emojione/emoji.json';

function createEmojis(emojiStrategy: Object): Object {
  const emojis = {};

  const keys = Object.keys(emojiStrategy);
  for (const key of keys) {
    const value = emojiStrategy[key];

    if (value.category !== 'modifier') {
      if (!emojis[value.category]) emojis[value.category] = {};
      const match = key.match(/(.*?)_tone(.*?)$/);

      if (match) {
        if (!value.keywords.includes(match[1])) {
          value.keywords.push(match[1]);
        }

        const unmodifiedEmojiExists = !!emojis[value.category][match[1]];
        if (unmodifiedEmojiExists) {
          emojis[value.category][match[1]][match[2]] = value;
        }
      } else {
        if (!value.keywords.includes(key)) {
          value.keywords.push(key);
        }
        emojis[value.category][key] = [value];
      }
    }
  }

  return emojis;
}

export default createEmojis(strategy);

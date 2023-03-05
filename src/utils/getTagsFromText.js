export const getTagsFromText = (text = '') => {
  if (!text) {
    return []
  }

  const regex = /(?:^|\s)#([\dA-Za-z]+)/gm;
  const matches = [];

  let match;

  while ((match = regex.exec(text))) {
    matches.push(match[1]);
  }

  return matches.filter((item, pos) => matches.indexOf(item) == pos).slice(0, 5);
};


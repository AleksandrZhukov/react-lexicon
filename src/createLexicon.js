const pathToArray = path => path
  .replace(/\[(.+?)\]/g, '.$1')
  .split('.');

const get = (obj = {}, path = '', defaultValue) =>
  pathToArray(path)
    .reduce((o, key) => o[key], obj) || defaultValue;

export default (lexicons, fallback) => {
  const fallbackKeys = fallback.replace(/\s/g, '').split(',');
  return (nameSpace) => {
    const isArrayMode = Array.isArray(nameSpace);
    const sourses = [...(isArrayMode ? nameSpace : [nameSpace]), ...fallbackKeys];

    return (path, options) => {
      let result;

      sourses.some(s => {
        if (!lexicons.hasOwnProperty(s)) return false;

        const nameSpaceLexicons = get(lexicons, s);
        if (!nameSpaceLexicons.hasOwnProperty(pathToArray(path)[0])) return false;

        result = get(nameSpaceLexicons, path);
        return result;
      });

      if (result === undefined) {
        console.error(lexicons.locale + ' locale - ' + 'There is no lexicon for this phrase: ' + nameSpace + '.' + path);
        return path;
      }

      if (options && Object.keys(options).length > 0) {
        result = result.replace(/{(.*)}/g,
          (m, k) => options.hasOwnProperty(k.trim()) ? options[k.trim()] : '');
      }
      return result;
    }
  }
};

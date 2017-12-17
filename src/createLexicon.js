import get from 'lodash.get';
import has from 'lodash.has';

export default (lexicons, fallback) => {
  const fallbackKeys = fallback.replace(/\s/g, '').split(',');
  return (nameSpace) => {
    const isArrayMode = Array.isArray(nameSpace);
    const sourses = [...(isArrayMode ? nameSpace : [nameSpace]), ...fallbackKeys];

    return (path, options) => {
      let result;

      sourses.some(s => {
        if (!has(lexicons, s)) return false;

        const nameSpaceLexicons = get(lexicons, s);
        result = get(nameSpaceLexicons, path);
        return result;
      });

      if (result === undefined) {
        console.error(lexicons.locale + ' locale - ' + 'There is no lexicon for this phrase: ' + path);
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

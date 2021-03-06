import React from 'react'
import PropTypes from 'prop-types';

export default function lexicon(displayName) {
  let l;
  let previousLocale = null;
  return (ChildComponent) => {
    let lexicons = displayName || ChildComponent.name;
    return class Lexicon extends React.PureComponent {
      static contextTypes = {
        lexicon: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
        executorName: PropTypes.string
      };

      render() {
        const { lexicon, locale, executorName } = this.context;
        if (locale !== previousLocale) {
          l = lexicon(lexicons);
          previousLocale = locale
        }
        return <ChildComponent {...this.props} {...{[executorName]: l }} />;
      }
    };
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import createLexicon from './createLexicon';

export default class LexiconProvider extends React.PureComponent {
  getChildContext() {
    const { lexicons, fallback, executorName } = this.props;
    return {
      lexicon: createLexicon(lexicons, fallback),
      locale: lexicons.locale,
      executorName
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

LexiconProvider.propTypes = {
  lexicons: PropTypes.object.isRequired,
  fallback: PropTypes.string
};

LexiconProvider.defaultProps = {
  fallback: '',
  executorName: 'l'
};

LexiconProvider.childContextTypes = {
  lexicon: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  executorName: PropTypes.string
};

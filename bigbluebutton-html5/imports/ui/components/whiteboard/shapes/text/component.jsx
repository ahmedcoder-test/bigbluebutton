import React from 'react';
import PropTypes from 'prop-types';
import ShapeHelpers from '../helpers.js';

export default class TextDrawComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.shape.version != nextProps.shape.version;
  }

  getCoordinates() {
    const x = this.props.shape.x / 100 * this.props.slideWidth;
    const y = this.props.shape.y / 100 * this.props.slideHeight;
    const width = this.props.shape.textBoxWidth / 100 * this.props.slideWidth;
    const height = this.props.shape.textBoxHeight / 100 * this.props.slideHeight;
    const fontColor = ShapeHelpers.formatColor(this.props.shape.fontColor);
    const fontSize = this.props.shape.fontSize;
    const calcedFontSize = this.props.shape.calcedFontSize / 100 * this.props.slideHeight;
    const text = this.props.shape.text;

    return {
      x,
      y,
      text,
      width,
      height,
      fontSize,
      fontColor,
      calcedFontSize,
    };
  }

  getStyles(results) {
    const styles = {
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      pointerEvents: 'none',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      fontFamily: 'Arial',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      wordBreak: 'normal',
      textAlign: 'left',
      margin: 0,
      color: results.fontColor,
      fontSize: results.calcedFontSize,
    };
    return styles;
  }

  renderViewerTextShape(results, styles) {
    return (
      <g>
        <clipPath id={this.props.shape.id}>
          <rect
            x={results.x}
            y={results.y}
            width={results.width}
            height={results.height}
            fill="purple"
            strokeWidth="2"
          />
        </clipPath>

        <foreignObject
          clipPath={`url(#${this.props.shape.id})`}
          x={results.x}
          y={results.y}
          width={results.width}
          height={results.height}
        >
          <p style={styles}>
            {results.text}
          </p>
        </foreignObject>
      </g>
    );
  }

  renderPresenterTextShape(results, styles) {
    return (
      <g></g>
    );
  }

  render() {
    let results = this.getCoordinates();
    let styles = this.getStyles(results);

    if(this.props.isPresenter && this.props.shape.status != "textPublished") {
      return this.renderPresenterTextShape(results, styles);
    } else {
      return this.renderViewerTextShape(results, styles);
    }
  }
}

TextDrawComponent.defaultProps = {

};

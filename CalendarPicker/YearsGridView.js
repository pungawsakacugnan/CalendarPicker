import React from 'react';
import {
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { YEARS_MATRIX_COUNT } from './Utils';

import TouchableFeedback from './components/TouchableFeedback';

export default function YearsGridView(props) {
  const {
    year,
    yearsOffset,
    styles,
    textStyle,
    onPressYear,
  } = props;
  const guideArray = [ 0, 1, 2, 3 ];
  let yearMin = year;
  if (yearsOffset !== 0) {
    yearMin = year + (YEARS_MATRIX_COUNT * yearsOffset);
  }

  function generateColumns(i) {
    const column = guideArray.map(index => {
      const yearIndex = (guideArray.length * i) + yearMin + index;
      let wrapperStyles = [styles.yearGridWrapper];
      if (year === yearIndex) {
        wrapperStyles = [...wrapperStyles, styles.selectedYear];
      }
      return (
        <TouchableFeedback
          activeOpacity={0.8}
          onPress={() => onPressYear(yearIndex)}
        >
          <View key={yearIndex} style={wrapperStyles}>
              <Text style={[textStyle, styles.yearGridLabel]}>
                { yearIndex }
              </Text>
          </View>
        </TouchableFeedback>
      );
    });
    return column;
  }

  return (
    <View style={styles.yearsWrapper}>
      { guideArray.map(index => (
          <View key={index} style={styles.yearRow}>
            { generateColumns(index) }
          </View>
        ))
      }
    </View>
  );
}

YearsGridView.propTypes = {
  styles: PropTypes.shape(),
  year: PropTypes.number.isRequired,
  yearsOffset: PropTypes.number.isRequired,
  onPressYear: PropTypes.func,
}

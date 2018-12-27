import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Utils,
  SELECT_MODE_MONTH,
  SELECT_MODE_YEAR,
  YEARS_MATRIX_COUNT,
} from './Utils';
import Controls from './Controls';

export default function HeaderControls(props) {
  const {
    styles,
    selectMode,
    yearsOffset,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    onChangeSelectMode,
    nextComponent,
    previousComponent,
    months,
    previousTitle,
    nextTitle,
    textStyle,
  } = props;
  const MONTHS = months? months : Utils.MONTHS; // English Month Array
  // getMonth() call below will return the month number, we will use it as the
  // index for month array in english
  const previous = previousTitle ? previousTitle : 'Previous';
  const next = nextTitle ? nextTitle : 'Next';
  const month = MONTHS[currentMonth];
  const year = currentYear;

  const renderPreviousComponent = (() => {
    if (selectMode === SELECT_MODE_MONTH) {
      return;
    }
    if (previousComponent) {
      return previousComponent.call(null, props);
    } else {
      return (
        <Controls
          label={previous}
          onPressControl={onPressPrevious}
          styles={[styles.monthSelector, styles.prev]}
          textStyles={textStyle}
        />
      );
    }
  })();

  const renderNextComponent = (() => {
    if (selectMode === SELECT_MODE_MONTH) {
      return;
    }
    if (nextComponent) {
      return nextComponent.call(null, props);
    } else {
      return (
        <Controls
          label={next}
          onPressControl={onPressNext}
          styles={[styles.monthSelector, styles.next]}
          textStyles={textStyle}
        />
      );
    }
  })();

  const headerText = (() => {
    switch (selectMode) {
      case SELECT_MODE_YEAR:
        let yearMin = year;
        if (yearsOffset !== 0) {
          yearMin = year + (YEARS_MATRIX_COUNT * yearsOffset);
        }
        const yearMax = yearMin + YEARS_MATRIX_COUNT - 1;
        return `${yearMin} - ${yearMax}`;
      case SELECT_MODE_MONTH:
        return year;
      default:
        return `${month} ${year}`;
    }
  })();

  return (
    <View style={styles.headerWrapper}>
      {renderPreviousComponent}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerText}
        onPress={onChangeSelectMode}
      >
        <Text style={[textStyle, styles.monthLabel]}>
          { headerText }
        </Text>
      </TouchableOpacity>
      {renderNextComponent}
    </View>
  );
}

HeaderControls.propTypes = {
  selectMode: PropTypes.number,
  yearsOffset: PropTypes.number,
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  onChangeSelectMode: PropTypes.func,
  nextComponent: PropTypes.any,
  previousComponent: PropTypes.any,
};

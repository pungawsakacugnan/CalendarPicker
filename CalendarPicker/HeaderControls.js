import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';

export default function HeaderControls(props) {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
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

  return (
    <View style={styles.headerWrapper}>
      {renderPreviousComponent}
      <View>
        <Text style={[textStyle, styles.monthLabel]}>
           { month } { year }
        </Text>
      </View>
      {renderNextComponent}
    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  nextComponent: PropTypes.any,
  previousComponent: PropTypes.any,
};

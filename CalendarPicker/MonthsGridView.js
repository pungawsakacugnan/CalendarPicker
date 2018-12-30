import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function MonthsGridView(props) {
  const {
    month,
    styles,
    textStyle,
    onPressMonth,
  } = props;
  const guideRowArray = [ 0, 1, 2 ];
  const guideColumnArray = [ 0, 1, 2, 3 ];

  function generateColumns(i) {
    const column = guideColumnArray.map(index => {
      const monthIndex = (guideColumnArray.length * i) + index;
      const baseMonth = moment([1970, monthIndex, ]);
      const wrapperStyles = month === monthIndex
        ? styles.selectedMonth
        : {};
      return (
        <View key={monthIndex} style={styles.monthGridWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressMonth(monthIndex)}
          >
            <View style={wrapperStyles}>
              <Text style={[textStyle, styles.monthGridLabel]}>
                { baseMonth.format('MMM') }
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
    return column;
  }

  return (
    <View style={styles.monthsWrapper}>
      { guideRowArray.map(index => (
          <View key={index} style={styles.monthRow}>
            { generateColumns(index) }
          </View>
        ))
      }
    </View>
  );
}

MonthsGridView.propTypes = {
  styles: PropTypes.shape(),
  month: PropTypes.number.isRequired,
  onPressMonth: PropTypes.func,
}

/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
const DEFAULT_SELECTED_BACKGROUND_COLOR = '#5ce600';
const DEFAULT_SELECTED_TEXT_COLOR = '#000000';
const DEFAULT_TODAY_BACKGROUND_COLOR = '#CCCCCC';

export function makeStyles(scaler, backgroundColor, textColor, todayBackgroundColor, width, height) {
  const SELECTED_BG_COLOR = backgroundColor ? backgroundColor : DEFAULT_SELECTED_BACKGROUND_COLOR;
  const SELECTED_TEXT_COLOR = textColor ? textColor : DEFAULT_SELECTED_TEXT_COLOR;
  const TODAY_BG_COLOR = todayBackgroundColor ? todayBackgroundColor : DEFAULT_TODAY_BACKGROUND_COLOR;
  return {
    calendar: {
      borderWidth: 1,
      height: 320*scaler,
      marginTop: 10*scaler
    },

    dayButton: {
      width: 30*scaler,
      height: 30*scaler,
      borderRadius: 30*scaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayLabel: {
      fontSize: 14*scaler,
      color: '#000',
      alignSelf: 'center'
    },

    selectedDayLabel: {
      color: SELECTED_TEXT_COLOR,
    },

    dayLabelsWrapper: {
      flexDirection: 'row',
      paddingTop: 10*scaler,
      paddingBottom: 10*scaler,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: 'rgba(0,0,0,0.2)'
    },

    daysWrapper: {
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayLabels: {
      width: 50*scaler,
      fontSize: 12*scaler,
      color: '#B9B9B9',
      textAlign: 'center'
    },

    selectedDay: {
      width: 30*scaler,
      height: 30*scaler,
      borderRadius: 30*scaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    selectedDayBackground: {
      backgroundColor: SELECTED_BG_COLOR,
    },

    selectedToday: {
      width: 30*scaler,
      height: 30*scaler,
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: 30*scaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50*scaler,
      height: 40*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    startDayWrapper: {
      width: 50*scaler,
      height: 30*scaler,
      borderTopLeftRadius: 20*scaler,
      borderBottomLeftRadius: 20*scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    endDayWrapper: {
      width: 50*scaler,
      height: 30*scaler,
      borderTopRightRadius: 20*scaler,
      borderBottomRightRadius: 20*scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    inRangeDay: {
      width: 50*scaler,
      height: 30*scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    monthLabel: {
      fontSize: 16*scaler,
      color: '#000',
      marginBottom: 10*scaler,
      width: 180*scaler,
      textAlign: 'center'
    },

    monthsWrapper: {
      alignSelf: 'center',
      justifyContent: 'center'
    },

    monthRow: {
      flexDirection: 'row'
    },

    monthGridWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 70*scaler,
      height: 70*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    monthGridLabel: {
      fontSize: 15*scaler,
      color: '#000',
      alignSelf: 'center'
    },

    selectedMonth: {
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: 70*scaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    yearsWrapper: {
      alignSelf: 'center',
      justifyContent: 'center'
    },

    yearRow: {
      flexDirection: 'row'
    },

    yearGridWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 70*scaler,
      height: 70*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    yearGridLabel: {
      fontSize: 15*scaler,
      color: '#000',
      alignSelf: 'center'
    },

    selectedYear: {
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: 70*scaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    headerWrapper: {
      width: width - 40 *scaler,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      padding: 5*scaler,
      paddingBottom: 3*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    headerText: {
      flex: 1,
      alignItems : 'center'
    },

    monthSelector: {
      marginBottom: 10*scaler,
      fontSize: 14*scaler,
      width: 80*scaler
    },

    prev: {
      textAlign: 'left'
    },

    next: {
      textAlign: 'right'
    },

    yearLabel: {
      fontSize: 14*scaler,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center'
    },

    weeks: {
      flexDirection: 'column'
    },

    weekRow: {
      flexDirection: 'row'
    },

    disabledText: {
      fontSize: 14*scaler,
      color: '#BBBBBB',
      alignSelf: 'center',
      justifyContent: 'center'
    }
  };
}

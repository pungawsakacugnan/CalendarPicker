import React, { Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import { makeStyles } from './makeStyles';
import {
  Utils,
  SELECT_MODE_DEFAULT,
  SELECT_MODE_MONTH,
  SELECT_MODE_YEAR,
  YEARS_MATRIX_COUNT
} from './Utils';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
import MonthsGridView from './MonthsGridView';
import YearsGridView from './YearsGridView';
import Swiper from './Swiper';
import moment from 'moment';

const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_RIGHT = 'SWIPE_RIGHT';

const _swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export default class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMode: SELECT_MODE_DEFAULT,
      currentMonth: null,
      currentYear: null,
      selectedStartDate: props.selectedStartDate || null,
      selectedEndDate: props.selectedEndDate || null,
      yearsOffset: 0,
      styles: {},
      ...this.updateScaledStyles(props),
      ...this.updateMonthYear(props.initialDate)
    };
    this.updateScaledStyles = this.updateScaledStyles.bind(this);
    this.updateMonthYear = this.updateMonthYear.bind(this);
    this.handleOnPressPrevious = this.handleOnPressPrevious.bind(this);
    this.handleOnPressNext = this.handleOnPressNext.bind(this);
    this.handleOnPressDay = this.handleOnPressDay.bind(this);
    this.handleOnPressMonth = this.handleOnPressMonth.bind(this);
    this.handleOnPressYear = this.handleOnPressYear.bind(this);
    this.handleOnChangeSelectMode = this.handleOnChangeSelectMode.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  static defaultProps = {
    initialDate: moment(),
    scaleFactor: 375,
    enableSwipe: true,
    onDateChange: () => { console.log('onDateChange() not provided') },
  }

  componentDidUpdate(prevProps, prevState) {
    let newStyles = {};
    let doStateUpdate = false;

    if (prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height)
    {
      newStyles = this.updateScaledStyles(this.props);
      doStateUpdate = true;
    }

    let newMonthYear = {};
    if (!moment(prevProps.initialDate).isSame(this.props.initialDate, 'day')) {
      newMonthYear = this.updateMonthYear(this.props.initialDate);
      doStateUpdate = true;
    }

    let selectedDateRanges = {};
    if (this.props.selectedStartDate && !moment(prevState.selectedStartDate).isSame(this.props.selectedStartDate, 'day') ||
      this.props.selectedEndDate && !moment(prevState.selectedEndDate).isSame(this.props.selectedEndDate, 'day')) {
      const { selectedStartDate = null, selectedEndDate = null } = this.props;
      selectedDateRanges = {
        selectedStartDate,
        selectedEndDate
      };
      doStateUpdate = true;
    }

    if (doStateUpdate) {
      this.setState({...newStyles, ...newMonthYear, ...selectedDateRanges});
    }
  }

  updateScaledStyles(props) {
    const {
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width, height,
    } = props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width ? width : Dimensions.get('window').width;
    const containerHeight = height ? height : Dimensions.get('window').height;
    const initialScale = Math.min(containerWidth, containerHeight) / scaleFactor;
    return {
      styles: makeStyles(
        initialScale,
        selectedDayColor,
        selectedDayTextColor,
        todayBackgroundColor,
        width,
        height
      )
    };
  }

  updateMonthYear(initialDate = this.props.initialDate) {
    return {
      currentMonth: parseInt(moment(initialDate).month()),
      currentYear: parseInt(moment(initialDate).year()),
    };
  }

  handleOnPressDay(day) {
    const {
      currentYear,
      currentMonth,
      selectedStartDate,
      selectedEndDate,
    } = this.state;

    const {
      allowRangeSelection,
      onDateChange,
    } = this.props;

    const date = moment({year: currentYear, month: currentMonth, day});

    if (allowRangeSelection &&
      selectedStartDate &&
      date.isSameOrAfter(selectedStartDate) &&
      !selectedEndDate) {
      this.setState({
        selectedEndDate: date,
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.END_DATE);
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.START_DATE);
    }
  }

  handleOnPressMonth(month) {
    const { selectedStartDate } = this.state;
    const { onDateChange } = this.props;
    this.setState({
      selectMode: SELECT_MODE_DEFAULT, // reset
      currentMonth: month,
      selectedStartDate,
      selectedEndDate: null,
    });
    // propagate to parent date has changed
    onDateChange(selectedStartDate, Utils.START_DATE);
  }

  handleOnPressYear(year) {
    const { selectedStartDate } = this.state;
    const { onDateChange } = this.props;
    this.setState({
      selectMode: SELECT_MODE_MONTH, // go back to month view
      currentYear: year,
      selectedStartDate,
      selectedEndDate: null,
    });
    // propagate to parent date has changed
    onDateChange(selectedStartDate, Utils.START_DATE);
  }

  handleOnPressPrevious() {
    const { selectMode } = this.state;
    if (selectMode === SELECT_MODE_YEAR) {
      this.setState((state) => ({
        yearsOffset: state.yearsOffset - 1
      }));
      return;
    }
    let { currentMonth, currentYear } = this.state;
    let previousMonth = currentMonth - 1;
    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    if (previousMonth < 0) {
      previousMonth = 11;
      currentYear -= 1;  // decrement year
      this.setState({
        currentMonth: parseInt(previousMonth), // setting month to December
        currentYear: parseInt(currentYear),
      });
    } else {
      this.setState({
        currentMonth: parseInt(previousMonth),
        currentYear: parseInt(currentYear),
      });
    }
    this.props.onMonthChange && this.props.onMonthChange(moment({year: currentYear, month: previousMonth}));
  }

  handleOnPressNext() {
    const { selectMode } = this.state;
    if (selectMode === SELECT_MODE_YEAR) {
      this.setState((state) => ({
        yearsOffset: state.yearsOffset + 1
      }));
      return;
    }
    let { currentMonth, currentYear } = this.state;
    let nextMonth = currentMonth + 1;
    // if nextMonth is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    if (nextMonth > 11) {
      nextMonth = 0;
      currentYear += 1;  // increment year
      this.setState({
        currentMonth: parseInt(nextMonth), // setting month to January
        currentYear: parseInt(currentYear),
      });
    } else {
      this.setState({
        currentMonth: parseInt(nextMonth),
        currentYear: parseInt(currentYear),
      });
    }
    this.props.onMonthChange && this.props.onMonthChange(moment({year: currentYear, month: nextMonth}));
  }

  handleOnChangeSelectMode() {
    const { selectMode } = this.state;
    let newMode;
    switch (selectMode) {
      case SELECT_MODE_DEFAULT:
        newMode = SELECT_MODE_MONTH;
        break;
      case SELECT_MODE_MONTH:
        newMode = SELECT_MODE_YEAR;
        break;
      case SELECT_MODE_YEAR:
        return;
    }
    this.setState({
      selectMode: newMode
    });
  }

  onSwipe(gestureName) {
    if (typeof this.props.onSwipe === "function") {
      this.props.onSwipe(gestureName);
      return;
    }
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handleOnPressNext();
        break;
      case SWIPE_RIGHT:
        this.handleOnPressPrevious();
        break;
    }
  }

  resetSelections() {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null,
    });
  }

  setToday() {
    const { onDateChange } = this.props;
    const date = moment();
    this.setState({
      selectMode: SELECT_MODE_DEFAULT,
      initialDate: date,
      currentMonth: parseInt(date.month()),
      currentYear: parseInt(date.year()),
      selectedStartDate: date,
      selectedEndDate: null,
      yearsOffset: 0
    });
    // propagate to parent date has changed
    onDateChange(date, Utils.START_DATE);
  }

  render() {
    const {
      selectMode,
      yearsOffset,
      currentMonth,
      currentYear,
      selectedStartDate,
      selectedEndDate,
      styles,
    } = this.state;

    const {
      allowRangeSelection,
      startFromMonday,
      initialDate,
      minDate,
      maxDate,
      weekdays,
      months,
      previousTitle,
      nextTitle,
      previousComponent,
      nextComponent,
      textStyle,
      todayTextStyle,
      selectedDayStyle,
      selectedRangeStartStyle,
      selectedRangeStyle,
      selectedRangeEndStyle,
      disabledDates,
      minRangeDuration,
      maxRangeDuration,
      swipeConfig,
      customDatesStyles,
      headerStyles,
    } = this.props;

    let disabledDatesTime = [];

    // Convert input date into timestamp
    if (disabledDates && Array.isArray(disabledDates)) {
      disabledDates.map((date)=>{
        let thisDate = moment(date);
        thisDate.set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0});
        disabledDatesTime.push(thisDate.valueOf());
      });
    }

    let minRangeDurationTime = [];

    if (allowRangeSelection && minRangeDuration) {
      if (Array.isArray(minRangeDuration)) {
        minRangeDuration.map((minRangeDuration)=>{
          let thisDate = moment(minRangeDuration.date);
          thisDate.set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0});
          minRangeDurationTime.push({date: thisDate.valueOf(), minDuration: minRangeDuration.minDuration});
        });
      } else {
        minRangeDurationTime = minRangeDuration
      }
    }

    let maxRangeDurationTime = [];

    if (allowRangeSelection && maxRangeDuration) {
      if (Array.isArray(maxRangeDuration)) {
        maxRangeDuration.map((maxRangeDuration)=>{
          let thisDate = moment(maxRangeDuration.date);
          thisDate.set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0});
          maxRangeDurationTime.push({date: thisDate.valueOf(), maxDuration: maxRangeDuration.maxDuration});
        });
      } else {
        maxRangeDurationTime = maxRangeDuration
      }
    }

    return (
      <Swiper
        onSwipe={direction => this.props.enableSwipe && this.onSwipe(direction)}
        config={{..._swipeConfig, ...swipeConfig}}
      >
        <View syles={styles.calendar}>
          <HeaderControls
            styles={{...styles, ...headerStyles}}
            selectMode={selectMode}
            yearsOffset={yearsOffset}
            currentMonth={currentMonth}
            currentYear={currentYear}
            initialDate={moment(initialDate)}
            onChangeSelectMode={this.handleOnChangeSelectMode}
            onPressPrevious={this.handleOnPressPrevious}
            onPressNext={this.handleOnPressNext}
            months={months}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            previousComponent={previousComponent}
            nextComponent={nextComponent}
            textStyle={textStyle}
          />
          {selectMode === SELECT_MODE_DEFAULT && (
            <View>
              <Weekdays
                styles={styles}
                startFromMonday={startFromMonday}
                weekdays={weekdays}
                textStyle={textStyle}
              />
              <DaysGridView
                month={currentMonth}
                year={currentYear}
                styles={styles}
                onPressDay={this.handleOnPressDay}
                disabledDates={disabledDatesTime}
                minRangeDuration={minRangeDurationTime}
                maxRangeDuration={maxRangeDurationTime}
                startFromMonday={startFromMonday}
                allowRangeSelection={allowRangeSelection}
                selectedStartDate={selectedStartDate && moment(selectedStartDate)}
                selectedEndDate={selectedEndDate && moment(selectedEndDate)}
                minDate={minDate && moment(minDate)}
                maxDate={maxDate && moment(maxDate)}
                textStyle={textStyle}
                todayTextStyle={todayTextStyle}
                selectedDayStyle={selectedDayStyle}
                selectedRangeStartStyle={selectedRangeStartStyle}
                selectedRangeStyle={selectedRangeStyle}
                selectedRangeEndStyle={selectedRangeEndStyle}
                customDatesStyles={customDatesStyles}
              />
            </View>
          )}
          {selectMode === SELECT_MODE_MONTH && (
            <MonthsGridView
              month={currentMonth}
              year={currentYear}
              styles={styles}
              textStyle={textStyle}
              onPressMonth={this.handleOnPressMonth}
            />
          )}
          {selectMode === SELECT_MODE_YEAR && (
            <YearsGridView
              year={currentYear}
              yearsOffset={yearsOffset}
              styles={styles}
              textStyle={textStyle}
              minDate={minDate && moment(minDate)}
              maxDate={maxDate && moment(maxDate)}
              onPressYear={this.handleOnPressYear}
            />
          )}
        </View>
      </Swiper>
    );
  }
}

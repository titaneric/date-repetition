/* eslint-disable no-restricted-syntax */
import moment from 'moment';

import week from './week';

function* weeklyDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  const currentWeek = moment(option.dateStart).startOf('w');
  option.weekDayList.sort();
  while (true) {
    for (const weekDay of option.weekDayList) {
      const day = currentWeek.day(weekDay);
      if (day.isSameOrAfter(dayStart, 'day')) {
        yield day.clone().toDate();
      }
    }

    currentWeek.add(option.durationAmount, option.durationUnit);
  }
}

function getNextMonthlyDay(currentDay, option) {
  const nextMonth = currentDay
    .add(option.durationAmount, option.durationUnit);

  const nextDay = week.nextDayOfStartOfMonth(nextMonth, option.momentDateStart.format('ddd'));

  if (option.isLastWeek) {
    return week.nextDayOfEndOfMonth(nextDay);
  }

  return nextDay
    .add(option.weekOrder - 1, 'week')
    .day(option.momentDateStart.format('ddd'));
}

function* monthlyOnOrdinalDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  let currentDay = dayStart.clone();

  while (true) {
    yield currentDay.clone().toDate();
    currentDay = getNextMonthlyDay(currentDay, option);
  }
}

function* normalRepeatedDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  let currentDay = dayStart.clone();
  while (true) {
    yield currentDay.clone().toDate();
    currentDay = currentDay.add(option.durationAmount, option.durationUnit);
  }
}
function* dateGenerator(option) {
  if (option.durationUnit === 'w') {
    yield* weeklyDayGenerator(option);
  } else if (option.durationUnit === 'M' && option.ordinalWeek) {
    yield* monthlyOnOrdinalDayGenerator(option);
  } else {
    yield* normalRepeatedDayGenerator(option);
  }
}

export default dateGenerator;

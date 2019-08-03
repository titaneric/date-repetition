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
        yield day;
      }
    }

    currentWeek.add(option.durationAmount, option.durationUnit);
  }
}

function* monthlyOnOrdinalDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  let currentDay = dayStart.clone();

  while (true) {
    yield currentDay;
    const nextMonth = currentDay
      .add(option.durationAmount, option.durationUnit);

    const nextDay = week.nextDayOfStartOfMonth(nextMonth, option.momentDateStart.format('ddd'));
    currentDay = nextDay
      .add(option.weekOrder - 1, 'week')
      .day(option.momentDateStart.format('ddd'));
  }
}

function* normalRepeatedDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  let currentDay = dayStart.clone();
  while (true) {
    yield currentDay;
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

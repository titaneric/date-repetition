import moment from 'moment';

import week from './week';

function* weeklyDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  let currentDay = dayStart.clone();

  while (true) {
    for (const weekDay of option.weekDayList) {
      const day = currentDay.day(weekDay);
      if (day >= dayStart) yield day;
    }

    currentDay = currentDay.add(option.durationAmount, option.durationUnit);
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
    currentDay = currentDay.add(option.durationAmount, option.durationUnitUnit);
  }
}
function* dateGenerator(option) {
  if (option.durationUnit === 'w') {
    yield* weeklyDayGenerator(option);
  } else if (option.durationUnit === 'M' && option.monthDecision === 'w') {
    yield* monthlyOnOrdinalDayGenerator(option);
  } else {
    yield* normalRepeatedDayGenerator(option);
  }
}

export default dateGenerator;


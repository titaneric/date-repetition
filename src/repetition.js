/* eslint no-shadow: ["error", { "allow": ["tree"] }] */
/* eslint no-param-reassign: ["error", { "props": true
, "ignorePropertyModificationsFor": ["tree"] }] */

import week from './week';

import moment from 'moment';

function* weeklyDayGenerator(option) {
  const dayStart = moment(option.dateStart);
  let currentDay = dayStart.clone();

  while (true) {
    for (let weekDay of option.weekDayList) {
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
function afterOccurances(option, list) {
  const gen = dateGenerator(option);
  let day = option.momentDateStart;

  for (let i = 0; i < option.occurances; i += 1) {
    let k = 0;
    do {
      day = gen.next().value;
      list.push(day.clone());
      k++;
    } while (option.durationUnit === 'w' && k < option.weekDayList.length)
  }
}
function untilFinishDate(option, list) {
  const gen = dateGenerator(option);
  const momentDateFinish = moment(option.dateFinish);
  let day = option.momentDateStart;

  while ((day = gen.next().value) <= momentDateFinish) {
    list.push(day.clone());
  }
}
function generateRepetition(option) {
  option = { ...option, ...week.getDateInfo(option.dateStart) };
  const list = [];

  if (option.repeat) {
    if (option.decision === 'u') {
      untilFinishDate(option, list);
    } else if (option.decision === 'a') {
      afterOccurances(option, list);
    }
  } else {
    list.push(option.momentDateStart);
  }
  return list;
}

export default { generateRepetition }

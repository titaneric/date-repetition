import moment from 'moment';

function nextDayOfStartOfMonth(baseDay, dayINeed = moment(baseDay).day()) {
  const momentDate = moment(baseDay);

  const startOfMonth = momentDate.clone().startOf('month');

  const nextDay = startOfMonth.clone().day(dayINeed);

  if (nextDay.isBefore(startOfMonth)) {
    nextDay.add(1, 'week');
  }

  return nextDay;
}

function nextDayOfEndOfMonth(baseDay, dayINeed = moment(baseDay).day()) {
  const momentDate = moment(baseDay);

  const endOfMonth = momentDate.clone().endOf('month');

  const nextDay = endOfMonth.clone().day(dayINeed);

  if (nextDay.isAfter(endOfMonth)) {
    nextDay.subtract(1, 'week');
  }

  return nextDay;
}

function isLastWeekOfMonth(day) {
  return moment(day).isSame(nextDayOfEndOfMonth(day), 'day');
}

function weekOrder(d) {
  const momentDate = moment(d);

  const nextDay = nextDayOfStartOfMonth(d);

  return momentDate.diff(nextDay, 'week') + 1;
}

function getDateInfo(d) {
  return {
    monthDay: moment(d).format('D'),
    momentDateStart: moment(d),
    weekOrder: weekOrder(d),
    isLastWeek: isLastWeekOfMonth(d),
  };
}

export default {
  weekOrder,
  nextDayOfStartOfMonth,
  nextDayOfEndOfMonth,
  getDateInfo,
  isLastWeekOfMonth,
};

import moment from 'moment';

function nextDayOfStartOfMonth(baseDay, dayINeed = moment(baseDay).day()) {
  const momentDate = moment(baseDay);

  const startOfMonth = momentDate.clone().startOf('month');

  let nextDay = startOfMonth.clone().day(dayINeed);

  if (nextDay < startOfMonth) {
    nextDay = nextDay.add(1, 'week');
  }

  return nextDay;
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
  }
}

export default { weekOrder, nextDayOfStartOfMonth, getDateInfo };

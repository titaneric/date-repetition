import moment from 'moment';

function formatDate(d) {
  return moment(d).format('YYYY/MM/DD');
}

function isEqualDiff(durationAmount, durationUnit) {
  return (status, cur, i, array) => {
    if (i < 2) {
      return true;
    }

    const [first, second, third] = array.slice(i - 2, i + 1);

    return status && (second.diff(first, durationUnit) === third.diff(second, durationUnit))
      && (third.diff(second, durationUnit) === durationAmount);
  };
}

function isLargeThanDayStart(dayStart) {
  return element => element >= dayStart;
}

function rightWeekOrder(weekDayList, dateStart) {
  let reorderedList = weekDayList.map(item => (item === 0 ? 7 : item));
  const dayStart = moment(dateStart).day();
  reorderedList.sort();
  const insertIndex = reorderedList.findIndex(isLargeThanDayStart(dayStart));
  reorderedList = reorderedList.concat(reorderedList.splice(0, insertIndex));
  reorderedList = reorderedList.map(item => (item === 7 ? 0 : item));
  return reorderedList;
}

export default { isEqualDiff, formatDate, rightWeekOrder };

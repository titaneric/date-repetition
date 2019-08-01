import moment from 'moment';

function formatDate(d) {
  return moment(d).format('YYYY/MM/DD');
}

function isEqualDiff(durationAmount, durationUnit) {
  return (status, cur, i, array) => {
    if (i < 2) {
      return true;
    }

    const first = array[i - 2];
    const second = array[i - 1];
    const third = array[i];

    return status && (second.diff(first, durationUnit) === third.diff(second, durationUnit))
            && (third.diff(second, durationUnit) === durationAmount);
  };
}

export default { isEqualDiff, formatDate };

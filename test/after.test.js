/* eslint-disable no-restricted-syntax */
/* global test expect */

import moment from 'moment';
import faker from 'faker';

import DateRepetition from '../index';

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

// test('Validate the day repeition', () => {

// });

test('Validate the day repetition of monthly ordinal week', () => {
  const currentDate = faker.date.recent(); // The fourth Sunday in July
  const day = moment(currentDate).day();
  const orderAfterOption = {
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: 'M',
    ordinalWeek: true,
  };
  // const dateStartWeekOrder = week.weekOrder(orderAfterOption.dateStart);
  const len = 4;
  const list = new DateRepetition(orderAfterOption).afterOccurances(len);
  expect(list.length).toBe(len);
  expect(formatDate(list[0])).toBe(formatDate(orderAfterOption.dateStart));
  for (const d of list) {
    const momentDay = moment(d);
    expect(momentDay.day()).toBe(day);
    // expect(week.weekOrder(momentDay)).toBe(dateStartWeekOrder);
  }
});

test('Validate the day repetition in days', () => {
  const currentDate = faker.date.recent(); // The fourth Sunday in July
  const afterOption = {
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: 'd',
  };

  const len = 10;
  const list = new DateRepetition(afterOption).afterOccurances(len);
  expect(list.length).toBe(len);
  expect(formatDate(list[0])).toBe(formatDate(afterOption.dateStart));
  expect(list.reduce(
    isEqualDiff(afterOption.durationAmount, afterOption.durationUnit),
  )).toBe(true);
});

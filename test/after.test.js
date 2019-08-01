/* eslint-disable no-restricted-syntax */
/* global test expect */

import moment from 'moment';
import faker from 'faker';

import DateRepetition from '../src/repetition';
import aux from '../src/testAux';

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
  expect(aux.formatDate(list[0])).toBe(aux.formatDate(orderAfterOption.dateStart));
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
  expect(aux.formatDate(list[0])).toBe(aux.formatDate(afterOption.dateStart));
  expect(list.reduce(
    aux.isEqualDiff(afterOption.durationAmount, afterOption.durationUnit),
  )).toBe(true);
});

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
  const dateFinish = moment(currentDate).add(1, 'M');
  const list = new DateRepetition(orderAfterOption).untilFinishDate(dateFinish);
  expect(aux.formatDate(list[0])).toBe(aux.formatDate(orderAfterOption.dateStart));
  for (const d of list) {
    const momentDay = moment(d);
    expect(momentDay.day()).toBe(day);
    expect(dateFinish.toDate() - d.toDate()).toBeGreaterThanOrEqual(0);
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

  const dateFinish = moment(currentDate).add(3, 'M');
  const list = new DateRepetition(afterOption).untilFinishDate(dateFinish);
  expect(aux.formatDate(list[0])).toBe(aux.formatDate(afterOption.dateStart));
  expect(list.reduce(
    aux.isEqualDiff(afterOption.durationAmount, afterOption.durationUnit),
  )).toBe(true);
  for (const d of list) {
    expect(dateFinish.toDate() - d.toDate()).toBeGreaterThanOrEqual(0);
  }
});

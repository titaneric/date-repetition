/* eslint-disable no-restricted-syntax */
/* global test expect */

import moment from 'moment';
import faker from 'faker';

import DateRepetition from '../index';

test('Validate the day repeition', () => {
  const currentDate = faker.date.recent();
  const day = moment(currentDate).day();
  const afterOption = {
    dateStart: currentDate,
    weekDayList: [day], // , (day + 1) % 7, (day + 2) % 7],
    durationAmount: 1,
    durationUnit: 'w',
  };
  let lastDate = currentDate;
  const len = 10;
  const list = new DateRepetition(afterOption).afterOccurances(len);
  expect(list.length).toBe(len * afterOption.weekDayList.length);
  for (const [i, d] of list.entries()) {
    const momentDay = moment(d);
    if (i === 0) {
      expect(momentDay.diff(lastDate, 'week')).toBe(0);
    } else {
      expect(momentDay.diff(lastDate, 'week')).toBe(1);
    }
    lastDate = momentDay;
  }
});

test('Validate the day repetition of monthly ordinal week', () => {
  const currentDate = faker.date.recent(); // The fourth Sunday in July
  const day = moment(currentDate).day();
  const orderAfterOption = {
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: 'M',
    ordinalWeek: true,
  };
  const len = 4;
  const list = new DateRepetition(orderAfterOption).afterOccurances(len);
  expect(list.length).toBe(len);
  for (const d of list) {
    const momentDay = moment(d);
    expect(momentDay.day()).toBe(day);
  }
});

/* eslint-disable no-restricted-syntax */
/* global test expect */

import moment from 'moment';
import faker from 'faker';
import circularIterator from 'circular-iterator';

import dateGenerator from '../src/generator';
import week from '../src/week';
import aux from '../src/testAux';


test('Validate the correctness of weeklyDayGenerator', () => {
  const currentDate = faker.date.recent();
  const day = moment(currentDate).day();

  let afterOption = {
    dateStart: currentDate,
    weekDayList: [day, (day + 1) % 7, (day + 2) % 7],
    durationAmount: 1,
    durationUnit: 'w',
  };
  afterOption = { ...afterOption, ...week.getDateInfo(afterOption.dateStart) };
  const reorderedList = aux.rightWeekOrder(afterOption.weekDayList, afterOption.dateStart);
  const len = 10;
  const gen = dateGenerator(afterOption);
  const dayGen = circularIterator(reorderedList);
  for (let i = 0; i < len; i += 1) {
    const nextDay = gen.next().value;
    const expectedDay = dayGen.next().value;
    expect(moment(nextDay).day()).toBe(expectedDay);
  }
});

test('Validate the correctness of monthlyOnOrdinalDayGenerator', () => {
  const currentDate = faker.date.recent();
  const day = moment(currentDate).day();

  let orderAfterOption = {
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: 'M',
    ordinalWeek: true,
  };
  orderAfterOption = { ...orderAfterOption, ...week.getDateInfo(orderAfterOption.dateStart) };
  const len = 10;
  const gen = dateGenerator(orderAfterOption);
  for (let i = 0; i < len; i += 1) {
    const nextDay = gen.next().value;
    expect(moment(nextDay).day()).toBe(day);
  }
});

test('Validate the correctness of normalRepeatedDayGenerator', () => {
  const currentDate = faker.date.recent();
  const afterOption = {
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: 'd',
  };

  const gen = dateGenerator(afterOption);
  const len = 10;
  const list = [];
  for (let i = 0; i < len; i += 1) {
    list.push(gen.next().value);
  }
  expect(aux.formatDate(list[0])).toBe(aux.formatDate(afterOption.dateStart));
  expect(list.reduce(
    aux.isEqualDiff(afterOption.durationAmount, afterOption.durationUnit),
  )).toBe(true);
});

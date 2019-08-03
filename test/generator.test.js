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
    expect(nextDay.day()).toBe(expectedDay);
  }
});

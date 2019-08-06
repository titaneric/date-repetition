/* eslint-disable no-restricted-syntax */
/* global test expect */

import faker from 'faker';

import DateRepetition from '../src/repetition';
import aux from '../src/testAux';

test('Validate the day repetition of monthly ordinal week', () => {
  const currentDate = faker.date.recent();
  const option = {
    dateStart: currentDate,
  };
  const list = new DateRepetition(option).noRepeat();
  expect(list.length).toBe(1);
  expect(aux.formatDate(list[0])).toBe(aux.formatDate(option.dateStart));
});

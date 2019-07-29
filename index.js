/* eslint no-shadow: ["error", { "allow": ["tree"] }] */
/* eslint no-param-reassign: ["error", { "props": true
, "ignorePropertyModificationsFor": ["tree"] }] */

import week from './week';
import dateGenerator from './generator';

import moment from 'moment';


export default class DateRepetition {
  constructor(option) {
    this.option = { ...option, ...week.getDateInfo(option.dateStart) };
  }

  afterOccurances(occurances) {
    const list = [];

    const gen = dateGenerator(this.option);
    let day = this.option.momentDateStart;

    for (let i = 0; i < occurances; i += 1) {
      let k = 0;
      do {
        day = gen.next().value;
        list.push(day.clone());
        k++;
      } while (this.option.durationUnit === 'w' && k < this.option.weekDayList.length)
    }
    return list;

  }
  untilFinishDate(dateFinish) {
    const list = [];

    const gen = dateGenerator(this.option);
    const momentDateFinish = moment(dateFinish);
    let day = this.option.momentDateStart;

    while ((day = gen.next().value) <= momentDateFinish) {
      list.push(day.clone());
    }
    return list;
  }
  noRepeat() {
    return [this.option.momentDateStart];
  }
}


/* eslint no-cond-assign: "error" */

import moment from 'moment';

import week from './week';
import dateGenerator from './generator';

export default class DateRepetition {
  constructor({
    dateStart = new Date(),
    weekDayList = [moment(dateStart).day()],
    durationAmount = 1,
    durationUnit = 'w',
    ordinalWeek = false,
  } = {}) {
    this.option = {
      ...{
        dateStart, weekDayList: weekDayList.slice(), durationUnit, durationAmount, ordinalWeek,
      },
      ...week.getDateInfo(dateStart),
    };
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
        k += 1;
      } while (this.option.durationUnit === 'w' && k < this.option.weekDayList.length);
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

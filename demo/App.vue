<template>
  <div id="app">
    <h1>Demo</h1>
    <ul>
      <li
        v-for="(date, index) in order_demo"
        :key="index"
      >
        {{ date }}
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';

import DateRepetition from '../src/repetition';

export default {
  data() {
    return {};
  },
  computed: {
    after_demo() {
      const currentDate = new Date();
      const afterOption = {
        dateStart: currentDate,
        weekDayList: [0, 1, 2],
        durationAmount: 1,
        durationUnit: 'w',
      };

      const list = new DateRepetition(afterOption).afterOccurances(3);

      return list;
    },
    until_demo() {
      const currentDate = new Date();

      const untilOption = {
        dateStart: currentDate,
        weekDayList: [moment(currentDate).day()],
        durationAmount: 2,
        durationUnit: 'w',
      };

      const list = new DateRepetition(untilOption).untilFinishDate(
        moment(currentDate)
          .add(1, 'M')
          .toDate(),
      );

      return list;
    },
    order_demo() {
      const currentDate = new Date(2019, 7, 28);

      const orderAfterOption = {
        dateStart: currentDate,
        durationAmount: 1,
        durationUnit: 'M',
        ordinalWeek: true,
      };

      const list = new DateRepetition(orderAfterOption).afterOccurances(4);

      return list;
    },
  },
};
</script>

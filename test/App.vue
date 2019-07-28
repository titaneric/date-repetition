<template>
  <div id="app">
    <h1>Demo</h1>
    <ul>
      <li v-for="(date, index) in demo" v-bind:key="index">{{ date }}</li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';

import repetition from "../repetition";

export default {
  data() {
    return {
    };
  },
  computed: {
    demo() {
      const currentDate = new Date();
      // const after_option = {
      //   repeat: true,
      //   dateStart: currentDate,
      //   weekDayList: [0, 1, 2],
      //   durationAmount: 1,
      //   durationUnit: "w",
      //   decision: "a",
      //   occurances: 5
      // };

      // const until_option = {
      //   repeat: true,
      //   dateStart: currentDate,
      //   weekDayList: [moment(currentDate).day()],
      //   durationAmount: 2,
      //   durationUnit: "w",
      //   decision: "u",
      //   dateFinish: moment(currentDate)
      //     .add(1, "M")
      //     .toDate(),
      //   monthDecision: "d"
      // };

      const order_after_option = {
        repeat: true,
        dateStart: currentDate,
        weekDayList: [moment(currentDate).day()],
        durationAmount: 1,
        durationUnit: "M",
        decision: "a",
        occurances: 5,
        monthDecision: "w"
      };

      const list = repetition.generateRepetition(order_after_option);

      return list;
    }
  }
};
</script>


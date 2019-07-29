<template>
  <div id="app">
    <h1>Demo</h1>
    <ul>
      <li v-for="(date, index) in order_demo" v-bind:key="index">{{ date }}</li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";

import DateRepetition from "../index";

export default {
  data() {
    return {};
  },
  computed: {
    after_demo() {
      const currentDate = new Date();
      const after_option = {
        dateStart: currentDate,
        weekDayList: [0, 1, 2],
        durationAmount: 1,
        durationUnit: "w"
      };

      const list = new DateRepetition(after_option).afterOccurances(3);

      return list;
    },
    until_demo() {
      const currentDate = new Date();

      const until_option = {
        dateStart: currentDate,
        weekDayList: [moment(currentDate).day()],
        durationAmount: 2,
        durationUnit: "w"
      };

      const list = new DateRepetition(until_option).untilFinishDate(
        moment(currentDate)
          .add(1, "M")
          .toDate()
      );

      return list;
    },
    order_demo() {
      const currentDate = new Date();

      const order_after_option = {
        repeat: true,
        dateStart: currentDate,
        weekDayList: [moment(currentDate).day()],
        durationAmount: 1,
        durationUnit: "M",
        monthDecision: "w"
      };

      const list = new DateRepetition(order_after_option).afterOccurances(4);

      return list;
    }
  }
};
</script>


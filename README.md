# date-repetition

**Implement the custom date repetition feature of Google Calender.**

## Things you can do

- Select the interval unit (day, week, month)
- Repeat on days (Mon, Sun etc.) in weeks
- Repeat after several times
- Repeat until some day
- Repeat the specific week orders in month (E.g. Monthly on the second Sunday)

## Features

 - ONLY depend on Moment.js
 - Help you to schedule your work
 - May be used in room reservation, calendar etc.

## Example

### Repeat Monday, Tuesday and Wednesday weekly starting from today after 3 occurances.

```js
const currentDate = new Date();
const after_option = {
    dateStart: currentDate,
    weekDayList: [0, 1, 2],
    durationAmount: 1,
    durationUnit: "w"
};

const list = new DateRepetition(after_option).afterOccurances(3);
```

### Repeat today's week day every two weeks until the day after one month.

```js
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
```

### Repeat monthly on fourth Sunday after 4 occurances

```js
const currentDate = new Date(2019, 7, 28); // The fourth Sunday in July

const order_after_option = {
    repeat: true,
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: "M",
    ordinalWeek: true
};

const list = new DateRepetition(order_after_option).afterOccurances(4);
```

## Document

### Fundamental
| Name  | Meaning  | Available value  |
|---|---|---|
|  dateStart | The starting day to repeat | JS `Date` object  |
|   durationAmount| The frequency to repeat, according to `durationUnit`  | positive integer  |
|   durationUnit| The unit to repeat  | 'd'\|'w'\|'M'  |
|  weekDayList | The array containing week days, only valid when `durationUnit` is **'w'**  | optional or [0-6]  |
|   ordinalWeek| If `durationUnit` is **'M'**, set **true** if you want to get the specific order in week monthly  | optional or **true**  |

Note that the `durationUnit` follow the Moment.js convention, please refer to [documentation](https://momentjs.com/docs/#/manipulating/).

### After

*afterOccurances(occurances)*

| Name  | Meaning  | Available value  |
|---|---|---|
|  occurances | The number to repeat the event |  positive integer |

### Until

*untilFinishDate(dateFinish)*

| Name  | Meaning  | Available value  |
|---|---|---|
|  dateFinish | Repeat until the finishing day | JS `Date` object  |

### Todo

 - Strict and tough test process
 - Rewrite the weekOrder to support for 'last' Sunday monthly.
 - Better test component in Vue.

### Remark

 - For me, this project is more like the practice than the library.
 - This project is the part of my other project, and I will release it soon.
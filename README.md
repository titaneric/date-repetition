# date-repetition

[![Build Status](https://travis-ci.com/titaneric/date-repetition.svg?branch=master)](https://travis-ci.com/titaneric/date-repetition)
[![Open Source Love](https://badges.frapsoft.com/os/gpl/gpl.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)


**Implement the custom date repetition feature of Google Calender.**

## Things you can do

- Select the interval unit (day, week, month)
- Repeat on days (Mon, Sun etc.) in weeks
- Repeat after several times
- Repeat until someday
- Repeat the specific week orders in month (E.g. Monthly on the second Sunday)

## Features
 
 - ONLY depend on Moment.js
 - Help you to schedule your work
 - Could be used in room reservation, calendar etc.

---

## Install

```bash
npm install date-repetition
```

## Example

### Repeat Sunday, Monday and Tuesday weekly starting from today after 3 occurances.

```js
import DateRepetition from 'date-repetition';

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
import moment from 'moment';
import DateRepetition from 'date-repetition';

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
import DateRepetition from 'date-repetition';

const currentDate = new Date(2019, 7, 28); // The fourth Sunday in July

const order_after_option = {
    dateStart: currentDate,
    durationAmount: 1,
    durationUnit: "M",
    ordinalWeek: true
};

const list = new DateRepetition(order_after_option).afterOccurances(4);
```

---

## Document

### Arguments
| Name  | Meaning  | Available value  |Default value|
|---|---|---|---|
|  `dateStart` | The starting day to repeat | JS `Date` object  | new Date() |
|   `durationAmount`| The frequency to repeat, according to `durationUnit`  | positive integer  | 1|
|   `durationUnit`| The unit to repeat  | 'd'\|'w'\|'M'  |'w'|
|  `weekDayList` | The array containing week days, **only** valid when `durationUnit` is **'w'**.  | optional or array consisted of [0-6]  |[`moment(dateStart).day()`]|
|   `ordinalWeek`| **Only** when `durationUnit` is **'M'**, set **true** if you want to get the specific order in week monthly.  | optional or **true**  |false|

Note that the `durationUnit` and value in `weekDayList` follow the Moment.js convention, please refer to [documentation](https://momentjs.com/docs/#/manipulating/).

### After

*afterOccurances(occurances)*

| Name  | Meaning  | Available value  |
|---|---|---|
|  `occurances` | The number to repeat the event |  positive integer |

### Until

*untilFinishDate(dateFinish)*

| Name  | Meaning  | Available value  |
|---|---|---|
|  `dateFinish` | Repeat until the finishing day | JS `Date` object  |

### No repeat

*noRepeat()*

### Return

**Array of JS Date object.**

---

## Todo

 - Strict and tough test process
 - Support for 'last' weekday monthly (the fourth and the fifth).
 - Better demo component in Vue.

## Remark

 - For me, this project is more like practice than library.

   Just leave a note for keeping the experience.

   What I learned

    - Airbnb coding style
    - ES6 Generator feature
    - Better class design
    - fundamental Jest for unit test
    - Travis for CI/CD
    - Wrap a npm package
    - Some elementary knowledge for webpack, babel and npm
    - Write documents

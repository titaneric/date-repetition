# date-repetition

**Implement the custom recurrance feature of Google Calender.**

## Things you can do

- Select the interval unit (day, week, month)
- Repeat on days (Mon, Sun etc.) in weeks
- Repeat after several times
- Repeat until some day
- Repeat the specific week orders in month (E.g. Monthly on the second Sunday)

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
weekDayList: [moment(currentDate).day()],
durationAmount: 1,
durationUnit: "M",
monthDecision: "w"
};

const list = new DateRepetition(order_after_option).afterOccurances(4);
```

import moment from 'moment';
import Chance from 'chance';
import faker from 'faker';

import week from "../week";

function date_format(day) {
    return moment(day).format("YYYY/M/D");
}
test('Validate the correctness of nextDayOfStartOfMonth', () => {
    const currentDate = faker.date.recent();
    const currentMonth = moment(currentDate).month();
    const nextDay = week.nextDayOfStartOfMonth(currentDate);

    // Test the week day corretness
    expect(nextDay.day()).toBe(moment(currentDate).day());

    // Test the starting week day of the month
    expect(nextDay.subtract(1, 'week').month()).toBe((currentMonth == 0) ? 11 : currentMonth - 1);
    expect(nextDay.add(1, 'week').month()).toBe(currentMonth);

    // Test the date
    expect(nextDay.date()).toBeLessThanOrEqual(7);
    // Test the month
    expect(nextDay.month()).toBe(currentMonth);
});

test('Validate the correctness of weekOrder', () => {
    const currentDate = faker.date.recent();
    const moment_day = moment(currentDate);
    const nextDay = week.nextDayOfStartOfMonth(currentDate);
    const order = week.weekOrder(currentDate);

    // Test the week order
    expect(date_format(nextDay.add(order - 1, 'w'))).toBe(date_format(currentDate));

    // Test the day and month
    expect(nextDay.day()).toBe(moment_day.day());
    expect(nextDay.month()).toBe(moment_day.month());
});
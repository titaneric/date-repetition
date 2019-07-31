import moment from 'moment';
import faker from 'faker';
import Chance from 'chance';

import DateRepetition from "../index";

function randomAfterOptionGenerator()
{

}

test('Validate the day repeition', () => {
    const currentDate = faker.date.recent();
    const day = moment(currentDate).day();
    const after_option = {
        dateStart: currentDate,
        weekDayList: [day],//, (day + 1) % 7, (day + 2) % 7],
        durationAmount: 1,
        durationUnit: "w"
    };
    let last_date = currentDate;
    const len = 10;
    const list = new DateRepetition(after_option).afterOccurances(len);
    expect(list.length).toBe(len * after_option.weekDayList.length);
    for (const [i, d] of list.entries()) {
        const moment_d = moment(d);
        if (i === 0) {
            expect(moment_d.diff(last_date, 'week')).toBe(0);
        } else {
            expect(moment_d.diff(last_date, 'week')).toBe(1);
        }
        last_date = moment_d;
    }
});

test('Validate the day repetition of monthly ordinal week', () => {
    const currentDate = faker.date.recent(); // The fourth Sunday in July
    const day = moment(currentDate).day();
    const order_after_option = {
        dateStart: currentDate,
        durationAmount: 1,
        durationUnit: "M",
        ordinalWeek: true
    };
    let last_date = currentDate;
    const len = 4;
    const list = new DateRepetition(order_after_option).afterOccurances(len);
    expect(list.length).toBe(len);
    for (const [i, d] of list.entries()) {
        const moment_d = moment(d);
        expect(moment_d.day()).toBe(day);
    }
});
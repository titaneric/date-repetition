import _ from 'lodash'
import repetition from './repetition';
import moment from 'moment';

function component() {
    const element = document.createElement('div');

    const currentDate = new Date()
    const after_option = {
        repeat: true,
        dateStart: currentDate,
        weekDayList: [0, 1, 2],
        durationAmount: 1,
        durationUnit: 'w',
        decision: 'a',
        occurances: 5,
    }

    const until_option = {
        repeat: true,
        dateStart: currentDate,
        weekDayList: [moment(currentDate).day()],
        durationAmount: 2,
        durationUnit: 'w',
        decision: 'u',
        dateFinish: moment(currentDate).add(1, "M").toDate(),
        monthDecision: 'd',
    }

    const order_after_option = {
        repeat: true,
        dateStart: currentDate,
        weekDayList: [moment(currentDate).day()],
        durationAmount: 1,
        durationUnit: 'M',
        decision: 'a',
        occurances: 5,
        monthDecision: 'w',
    }

    const list = repetition.generateRepetition(order_after_option)
    for (const day of list)
    {
        console.log(day.toDate())
    }

    

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
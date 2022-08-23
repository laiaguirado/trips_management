import moment from "moment";

export function published(b) {
    let differenceObject = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        days: 0,
        months: 0,
        years: 0,
    };
    let now = moment();
    let date = moment(b);
    differenceObject.years = now.diff(date, "year");
    differenceObject.months = now.diff(date, "months");
    differenceObject.days = now.diff(date, "days");
    differenceObject.hours = now.diff(date, "hours");
    differenceObject.minutes = now.diff(date, "minutes");
    differenceObject.seconds = now.diff(date, "seconds");

    return differenceObject;
}

export function changeDateOrder(initialDate) {
    return moment(initialDate).format("DD-MM-YYYY");
}


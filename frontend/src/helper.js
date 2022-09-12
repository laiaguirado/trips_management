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

export function localDateTime(initialDate) {
    let fullDate = new Date(initialDate);
    let date = fullDate.toLocaleDateString();
    if (fullDate.getDate() < 10) {
        date = "0" + date;
    }
    if (fullDate.getMonth() < 10) {
        date = date.substring(0, 3) + "0" + date.substring(3, date.length)
    }
    let hour = fullDate.toLocaleTimeString();
    if (hour.length < 8) {
        hour = "0" + hour;
    }
    hour = hour.substring(0, hour.length - 3)
    return { date, hour }
}

export function localDate(initialDate) {
    let fullDate = new Date(initialDate);
    let date = fullDate.toLocaleDateString();
    if (fullDate.getDate() < 10) {
        date = "0" + date;
    }
    if (fullDate.getMonth() < 10) {
        date = date.substring(0, 3) + "0" + date.substring(3, date.length)
    }
    return date;
}

export function changeBoolean(e, option, setFunction, booleanChecked, setFunctionChecked) {
    if (option) {
        const otherValue = booleanChecked[1];
        if (booleanChecked[0]) {
            setFunction(null);
            setFunctionChecked([false, otherValue]);
            e.target.checked = false;
        } else {
            setFunction(true);
            setFunctionChecked([true, false]);
            e.target.checked = true;
        }
    } else {
        const otherValue = booleanChecked[0];
        if (booleanChecked[1]) {
            setFunction(null);
            setFunctionChecked([otherValue, false]);
            e.target.checked = false;
        } else {
            setFunction(false);
            setFunctionChecked([false, true]);
            e.target.checked = true;
        }
    }
}


import {convertToNDigitsString} from "./stringManipulation/convertToNDigitsString";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import {_} from "./primary-utils";

export function makeDate(date) {
    if (_.isDate(date)) {
        return date;
    }

    let newDate;

    if (typeof date === "string" || date instanceof String) {
        newDate = new Date(date);
    } else {
        newDate = new Date();
    }

    return newDate;
}

export function localeWeekday(date) {
    date = makeDate(date);

    const weekDay = [
        "Pazar",
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi"
    ];

    return weekDay[date.getDay()];
}

export function hourMinute(date) {
    date = makeDate(date);

    const hour = date.getHours();
    const minute = date.getMinutes();

    const hourString = convertToNDigitsString(hour);
    const minuteString = convertToNDigitsString(minute);

    return hourString + ":" + minuteString;
}

export function localeDateLong(date, locale = "tr-TR") {
    date = makeDate(date);

    return date.toLocaleDateString(locale, {dateStyle: "long"});
}

export function localeDateFull(date) {
    return localeDateLong(date) + " " + localeWeekday(date);
}

export function localeDateTimeLong(date, locale = "tr-TR") {
    return localeDateLong(date, locale) + " " + hourMinute(date);
}

export function localeDateTimeFull(date, locale = "tr-TR") {
    return localeDateFull(date, locale) + " " + hourMinute(date);
}

export function makeJSDateObject(date) {
    return new Date(date.getTime());
}

export function weekRangeText(date, isWrapped, locale) {
    const dateClone = makeJSDateObject(date ? date : new Date());

    const start = startOfWeek(dateClone, {weekStartsOn: 1});
    const end = endOfWeek(dateClone, {weekStartsOn: 1});

    const weekText = localeDateLong(start, locale) + " - " + localeDateLong(end, locale);
    if (isWrapped) {
        return "'" + weekText + "'";
    } else {
        return weekText;
    }
}

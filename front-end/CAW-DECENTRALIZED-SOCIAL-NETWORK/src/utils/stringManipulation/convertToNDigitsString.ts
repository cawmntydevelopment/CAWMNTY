import {_} from "../primary-utils";

export function convertToNDigitsString (number: number, n = 2) {
	return _.padStart(number.toString(), n, "0");
}

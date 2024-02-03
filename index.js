const EMPTY_LIST = null;
const cons = (first, rest) => ({ first, rest });
const isEmpty = (value) => EMPTY_LIST === value;
const isCons = (value, valuePredicate) => typeof value === "object" && value !== null &&
    "first" in value && "rest" in value &&
    valuePredicate(value.first) &&
    (isCons(value.rest, valuePredicate) || isEmpty(value.rest));
// ----- HELPER CONSTRUCTOR -----
const list = (...args) => args.reduce((rest, first) => cons(first, rest), EMPTY_LIST);
// ----- ABSTRACTIONS -----
const fold = (list, combine, initialValue) => isEmpty(list)
    ? initialValue
    : combine(list.first, fold(list.rest, combine, initialValue));
const map = (list, func) => fold(list, (first, mappedRest) => cons(func(first), mappedRest), EMPTY_LIST);
const filter = (list, predicate) => fold(list, (first, filteredRest) => predicate(first)
    ? cons(first, filteredRest)
    : filteredRest, EMPTY_LIST);
// ----- ADDITIONAL FUNCTIONS -----
const concat = (a, b) => fold(a, cons, b);
const prepend = (l, value) => concat(l, list(value));
const reverse = (list) => fold(list, (first, reversedRest) => prepend(reversedRest, first), EMPTY_LIST);
export { EMPTY_LIST, cons, isEmpty, isCons, list, fold, map, filter, concat, prepend, reverse };
//# sourceMappingURL=index.js.map
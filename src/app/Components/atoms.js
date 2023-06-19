import { atom } from 'recoil';

export const selectState = atom({
    key: 'selectState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const mobState = atom({
    key: 'mobState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const sideState = atom({
    key: 'sideState', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});


'use strict';

// Добавляет ноль к числу, если оно одноциферное
const setZero = (num) => {
    num = Number(num);
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
    return num;
};

export {setZero};

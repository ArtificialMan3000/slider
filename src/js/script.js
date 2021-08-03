'use strict';

import slider from './modules/slider';

// Скрипт начнёт выполняться после полной загрузки контента
document.addEventListener('DOMContentLoaded', () => {

    // Инициализируем слайдер
    slider({
        container: '.slider',
        slide: '.slider__slide',
        nextBtn: '.slider__next',
        prevBtn: '.slider__prev',
        totalCounter: '.slider__total',
        currentCounter: '.slider__current',
        wrapper: '.slider__wrapper',
        carousel: '.slider__carousel'
    });
});



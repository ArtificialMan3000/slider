## Скрипт, реализующий функционал слайдера.

### Установка

1. Поместить файлы slider.js и slider.css из папки dist в папку с проектом
2. Подключить скрипт и стили в HTML файле

```
<link rel="stylesheet" href="css/style.css">
<script src="js/slider.js"></script>
```

3. Поместить в HTML разметку слайдера

```
<div class="slider">
    <div class="slider__counter">
        <div class="slider__prev">
            ...
        </div>
        <span class="slider__current"></span>
        /
        <span class="slider__total"></span>
        <div class="slider__next">
            ...
        </div>
    </div>
    <div class="slider__wrapper">
        <div class="slider__carousel">
            <div class="slider__slide">
                <img src="img/image1.jpg" alt="...">
            </div>
            <div class="slider__slide">
                <img src="img/image2.jpg" alt="...">
            </div>
            <div class="slider__slide">
                <img src="img/image3.jpg" alt="...">
            </div>
            ...
        </div>
    </div>
</div>
```

4. Инициализировать слайдер, передав селекторы соответствующих элементов

```
slider.slider({
    container: '.slider',
    slide: '.slider__slide',
    wrapper: '.slider__wrapper',
    carousel: '.slider__carousel'
    nextBtn: '.slider__next',
    prevBtn: '.slider__prev',
    totalCounter: '.slider__total',
    currentCounter: '.slider__current',
});
```

**container** - элемент, содержащий слайдер.

**slide** - элемент слайда.

**wrapper** - обёртка для "карусели" со слайдами.

**carousel** - элемент, содержащий сами слайды.

**nextBtn** - кнопка "вперёд".

**prevBtn** - кнопка "назад".

**totalCounter** - элемент для вывода общего количества слайдов.

**currentCounter** - элемент для вывода номера текущего слайда.

Для того, чтобы запустить проект на своём компьютере, используйте команду `npm i`.
Для сборки исходников используйте команду `npm run prod`.

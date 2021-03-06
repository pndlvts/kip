# Шаблон на webpack для классического HTML проекта

Шаблон предназначен для верстки классического (не SPA) проекта (многостраничного сайта/лендинга). Сборка реализована на webpack. Для начала работ склонировать репозиторий, заменить репозиторий на чистый репозиторий проекта.

Перед началом работ обязательно учитывать следующие пункты:
- Стили, HTML классы и структура проекта следует [BEM методологии](https://ru.bem.info/)
- Шаблоны страниц, блоков и компонентов основаниы на pug-миксине [bempug](https://www.npmjs.com/package/bempug) 
- js блоков/компонентов подключаются в `/src/index.js`. Так же компоненты могут импортироваться в js блоков и использоваться в них.

## Команды

``` bash
    npm run dev     # сборка в режиме develop
    npm run build   # сборка в режиме build для продакшна
    npm run watch   # запуск локального сервера разработки в режиме develop
    npm run test    # запуск тестов
```

## Структура

### `/src/assets/`
Папка для статичных ресурсов сайта - шрифты, иконки, стили, интерфейсные изображения и пр. В стилях описываются глобальные свойства, переменные, сетка, миксины, шрифты и пр.

### `/src/components`
Компоненты проекта, иконки, кнопки, карточки, выпадающие списки, меню и пр. Минимальные структурные единицы. Каждый компонент может состоять из трех файлов - pug шаблон, собственные стили scss, своя логика в js. Каждый компонент должен работать в отрыве от контекста страницы или проекта для возможности переиспользования.
В шаблоне в качестве примера используется простой компонент кнопки.

### `/src/blocks/`
Структурные блоки проекта, как правило, состоят из компонентов `/src/components`. Повторяют структуру компонентов состоят из pug шаблона и могут иметь собственные js и scss.

### `/src/data/`
#### После изменения json или подключения новых необходимо перезапустить сборку проекта!
Папка для mock-данных, которые используются для для блоков и страниц. Данные размещаются в файлах json и подключаются в `webpack.config.js`

Пример на блоке header

После подключения данные из файла будут доступны из pug файлов в переменной `header` 
```js
{
    loader: 'pug-html-loader',
    query: {
      data: {
        linkslist: links,
        header: require('./src/data/header.json'),
      },
      pretty: true
    }
}
```

`/src/data/header.json`
```json
{
  "test": "Hello!"
}
```
`/src/blocks/header/header.pug`
```pug
mixin header
    +b('header', {t: 'header'})= header.test
```
В результате получим 
```html
<header class="header">Hello!</header>
```

## Страницы
Файлы страниц находятся в папке `/src/`. Для просмотра всех страниц во время разработки/сборки можно в файле [list.html](http://localhost:8080/list.html). Этот файл генерируется с помощью правил в `webpack.config.js` и шаблона `/src/list-template/`

## Иконки
Для использования svg иконок сконфигурированы svg-спрайты. Чтобы их использовать, необходимо в папку `/src/assets/icons/` сохранить svg-иконку, импортировать ее в файле `/src/assets/icons/icons.js` и использовать следующим образом:
```pug
    svg
        use(xlink:href="#ИМЯ_ФАЙЛА_ИКОНКИ_БЕЗ_РАСШИРЕНИЯ")
```

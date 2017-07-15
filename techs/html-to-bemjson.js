/**
 * html-to-bemjson
 * =================
 *
 * Собирает *bemjson*-файл на основе *html*.
 *
 * **Опции**
 *
 * * *String* **source** — Исходный html-файл. По умолчанию — `?.html`.
 * * *String* **target** — Результирующий BEMJSON-файл. По умолчанию — `?.bemjson.js`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-html-to-bemjson/techs/html-to-bemjson'));
 * ```
 */
var vfs = require('enb/lib/fs/async-fs'),
    html2bemjson = require('html2bemjson');

module.exports = require('enb/lib/build-flow').create()
    .name('enb-html-to-bemjson')
    .target('target', '?.bemjson.js')

    .useSourceFilename('htmlFile', '?.html')
    .optionAlias('htmlFile', 'htmlFileTarget')
    .optionAlias('htmlFile', 'source')

    .optionAlias('target', 'destTarget')
    .defineOption('opts', {})
    .builder(function(htmlFileName) {
        var opts = this._opts;

        return vfs.read(htmlFileName, 'utf-8')
            .then(function(html) {
                return '(' +
                    require('util').inspect(
                        html2bemjson.convert(html, opts),
                        { depth: null }) +
                ')';
            })
            .fail(function(data) {
                console.log('Fail with: ', data);
            });
    })
    .createTech();

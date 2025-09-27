// (c) Aivaras Gontis
// www.illustratorscripts.com
// MIT License

try {
    (function () {

        var DUP_COUNT = 500;
        var ITEM_NAME = "Test Item";
        var SYMBOL_NAME = "New Symbol";
        var STEP = 2;
        var SCALE = 1.1; 

        var pageItem, symbolItem, newPageItems, newSymbols;

        function log(argz) {
            var s = []
            for (var i = 0; i < arguments.length; i++)
                s.push(String(arguments[i]));
            var file = new File(File($.fileName).parent + "/log.txt");
            file.open("e", "TEXT", "????");
            file.seek(0, 2);
            file.lineFeed = $.os.search(/windows/i) != -1 ? 'windows' : 'macintosh';
            file.writeln(s.join(" "));
            $.writeln(s.join(" "));
            file.close();
        }


        function timeFunction(fn) {
            var start = new Date().getTime();
            var comment = fn() || "";
            var time = ((new Date().getTime() - start) / 1000).toFixed(3);
            log(fn.name + ["\t\t\t", "\t\t", "\t"][fn.name.length / 8 | 0] + time + "\t" + comment);
        }

        function findItem() {
            try {
                pageItem = activeDocument.pageItems.getByName(ITEM_NAME);
            } catch (e) { throw "no item found, named " + ITEM_NAME }

            return "item type:" + pageItem.constructor.name
        }

        function findSymbol() {
            try {
                symbolItem = activeDocument.symbols.getByName(SYMBOL_NAME);
            } catch (e) { throw "no symbol found, named " + SYMBOL_NAME }
        }

        function dupItem() {
            newPageItems = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var copy = pageItem.duplicate();
                copy.name = "";
                newPageItems.push(copy);
            }
        }

        function dupItemAndLeftTop() {
            newPageItems = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var copy = pageItem.duplicate();
                copy.name = "";
                copy.left += i * STEP;
                copy.top -= i * STEP;
                newPageItems.push(copy);
            }
        }

        function dupItemAndMatrix() {
            newPageItems = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var copy = pageItem.duplicate();
                copy.name = "";
                copy.transform(getTranslationMatrix(i * STEP, -i * STEP));
                newPageItems.push(copy);
            }
        }

        function dupItemAndTranslate() {
            newPageItems = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var copy = pageItem.duplicate();
                copy.name = "";
                copy.translate(i * STEP, -i * STEP);
                newPageItems.push(copy);
            }
        }

        function placeSymbol() {
            newSymbols = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var instance = activeDocument.symbolItems.add(symbolItem);
                newSymbols.push(instance);
            }
        }

        function placeSymbolAndLeftTop() {
            newSymbols = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var instance = activeDocument.symbolItems.add(symbolItem);
                instance.left += i * STEP;
                instance.top -= i * STEP;
                newSymbols.push(instance);
            }
        }

        function placeSymbolAndMatrix() {
            newSymbols = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var instance = activeDocument.symbolItems.add(symbolItem);
                instance.transform(getTranslationMatrix(i * STEP, -i * STEP));
                newSymbols.push(instance);
            }
        }

        function placeSymbolAndTranslate() {
            newSymbols = [];
            for (var i = 0; i < DUP_COUNT; i++) {
                var instance = activeDocument.symbolItems.add(symbolItem);
                instance.translate(i * STEP, -i * STEP);
                newSymbols.push(instance);
            }
        }

        function itemsLeftTop() {
            for (var i = 0, len = newPageItems.length; i < len; i++) {
                newPageItems[i].left += STEP;
                newPageItems[i].top += STEP;
            }
        }

        function symbolsLeftTop() {
            for (var i = 0, len = newSymbols.length; i < len; i++) {
                newSymbols[i].left += STEP;
                newSymbols[i].top += STEP;
            }
        }

        function itemsMatrix() {
            var matrix = getTranslationMatrix(STEP, STEP);
            for (var i = 0, len = newPageItems.length; i < len; i++) {
                newPageItems[i].transform(matrix);
            }
        }

        function symbolsMatrix() {
            var matrix = getTranslationMatrix(STEP, STEP);
            for (var i = 0, len = newSymbols.length; i < len; i++) {
                newSymbols[i].transform(matrix);
            }
        }

        function itemsPosition() {
            for (var i = 0, len = newPageItems.length; i < len; i++) {
                var p = newPageItems[i].position;
                newPageItems[i].position = [p[0] + STEP, p[1] + STEP];
            }
        }

        function symbolsPosition() {
            for (var i = 0, len = newSymbols.length; i < len; i++) {
                var p = newSymbols[i].position;
                newSymbols[i].position = [p[0] + STEP, p[1] + STEP];
            }
        }

        function itemsScaleWH() {
            for (var i = 0, len = newPageItems.length; i < len; i++) {
                newPageItems[i].width *= SCALE;
                newPageItems[i].height *= SCALE;
            }
        }

        function symbolsScaleWH() {
            for (var i = 0, len = newSymbols.length; i < len; i++) {
                newSymbols[i].width *= SCALE;
                newSymbols[i].height *= SCALE;
            }
        }

        function itemsResize() {
            var s = SCALE * 100;
            for (var i = 0, len = newPageItems.length; i < len; i++) {
                newPageItems[i].resize(s, s);
            }
        }

        function symbolsResize() {
            var s = SCALE * 100;
            for (var i = 0, len = newSymbols.length; i < len; i++) {
                newSymbols[i].resize(s, s);
            }
        }

        function itemsScaleMatrix() {
            var scaleMatrix = getScaleMatrix(SCALE, SCALE);
            for (var i = 0, len = newPageItems.length; i < len; i++) {
                newPageItems[i].transform(scaleMatrix);
            }
        }

        function symbolsScaleMatrix() {
            var scaleMatrix = getScaleMatrix(SCALE, SCALE);
            for (var i = 0, len = newSymbols.length; i < len; i++) {
                newSymbols[i].transform(scaleMatrix);
            }
        }

        log("// Starting test, doc has " + activeDocument.pageItems.length + " pageItems");

        var fns = [
            findItem,
            findSymbol,
            dupItem,
            dupItemAndLeftTop,
            dupItemAndMatrix,
            dupItemAndTranslate,
            placeSymbol,
            placeSymbolAndLeftTop,
            placeSymbolAndMatrix,
            placeSymbolAndTranslate,
            itemsLeftTop,
            symbolsLeftTop,
            itemsMatrix,
            symbolsMatrix,
            itemsPosition,
            symbolsPosition,
            itemsScaleWH,
            symbolsScaleWH,
            itemsResize,
            symbolsResize,
            itemsScaleMatrix,
            symbolsScaleMatrix
        ];

        for (var i = 0, len = fns.length; i < len; i++) {
            timeFunction(fns[i]);
        }

    })();
} catch (e) {
    log(e);
}

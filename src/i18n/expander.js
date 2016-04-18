'use strict';"use strict";
var html_ast_1 = require('angular2/src/compiler/html_ast');
var exceptions_1 = require('angular2/src/facade/exceptions');
/**
 * Expands special forms into elements.
 *
 * For example,
 *
 * ```
 * { messages.length, plural,
 *   =0 {zero}
 *   =1 {one}
 *   =other {more than one}
 * }
 * ```
 *
 * will be expanded into
 *
 * ```
 * <ul [ngPlural]="messages.length">
 *   <template [ngPluralCase]="0"><li i18n="plural_0">zero</li></template>
 *   <template [ngPluralCase]="1"><li i18n="plural_1">one</li></template>
 *   <template [ngPluralCase]="other"><li i18n="plural_other">more than one</li></template>
 * </ul>
 * ```
 */
function expandNodes(nodes) {
    var e = new _Expander();
    var n = html_ast_1.htmlVisitAll(e, nodes);
    return new ExpansionResult(n, e.expanded);
}
exports.expandNodes = expandNodes;
var ExpansionResult = (function () {
    function ExpansionResult(nodes, expanded) {
        this.nodes = nodes;
        this.expanded = expanded;
    }
    return ExpansionResult;
}());
exports.ExpansionResult = ExpansionResult;
var _Expander = (function () {
    function _Expander() {
        this.expanded = false;
    }
    _Expander.prototype.visitElement = function (ast, context) {
        return new html_ast_1.HtmlElementAst(ast.name, ast.attrs, html_ast_1.htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
    };
    _Expander.prototype.visitAttr = function (ast, context) { return ast; };
    _Expander.prototype.visitText = function (ast, context) { return ast; };
    _Expander.prototype.visitComment = function (ast, context) { return ast; };
    _Expander.prototype.visitExpansion = function (ast, context) {
        this.expanded = true;
        return ast.type == "plural" ? _expandPluralForm(ast) : _expandDefaultForm(ast);
    };
    _Expander.prototype.visitExpansionCase = function (ast, context) {
        throw new exceptions_1.BaseException("Should not be reached");
    };
    return _Expander;
}());
function _expandPluralForm(ast) {
    var children = ast.cases.map(function (c) {
        var expansionResult = expandNodes(c.expression);
        var i18nAttrs = expansionResult.expanded ?
            [] :
            [new html_ast_1.HtmlAttrAst("i18n", ast.type + "_" + c.value, c.valueSourceSpan)];
        return new html_ast_1.HtmlElementAst("template", [
            new html_ast_1.HtmlAttrAst("ngPluralCase", c.value, c.valueSourceSpan),
        ], [
            new html_ast_1.HtmlElementAst("li", i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)
        ], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html_ast_1.HtmlAttrAst("[ngPlural]", ast.switchValue, ast.switchValueSourceSpan);
    return new html_ast_1.HtmlElementAst("ul", [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
function _expandDefaultForm(ast) {
    var children = ast.cases.map(function (c) {
        var expansionResult = expandNodes(c.expression);
        var i18nAttrs = expansionResult.expanded ?
            [] :
            [new html_ast_1.HtmlAttrAst("i18n", ast.type + "_" + c.value, c.valueSourceSpan)];
        return new html_ast_1.HtmlElementAst("template", [
            new html_ast_1.HtmlAttrAst("ngSwitchWhen", c.value, c.valueSourceSpan),
        ], [
            new html_ast_1.HtmlElementAst("li", i18nAttrs, expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan)
        ], c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html_ast_1.HtmlAttrAst("[ngSwitch]", ast.switchValue, ast.switchValueSourceSpan);
    return new html_ast_1.HtmlElementAst("ul", [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLWlhd0g4QVVaLnRtcC9hbmd1bGFyMi9zcmMvaTE4bi9leHBhbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUJBVU8sZ0NBQWdDLENBQUMsQ0FBQTtBQUV4QywyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUc3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILHFCQUE0QixLQUFnQjtJQUMxQyxJQUFJLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxHQUFHLHVCQUFZLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFKZSxtQkFBVyxjQUkxQixDQUFBO0FBRUQ7SUFDRSx5QkFBbUIsS0FBZ0IsRUFBUyxRQUFpQjtRQUExQyxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUFHLENBQUM7SUFDbkUsc0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLHVCQUFlLGtCQUUzQixDQUFBO0FBRUQ7SUFFRTtRQURBLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDWCxDQUFDO0lBRWhCLGdDQUFZLEdBQVosVUFBYSxHQUFtQixFQUFFLE9BQVk7UUFDNUMsTUFBTSxDQUFDLElBQUkseUJBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsdUJBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQ3JFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7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Q0FBQztTQUM1RCxFQUNEO1lBQ0UsSUFBSSx5QkFBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFDdEMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDN0QsRUFDRCxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxVQUFVLEdBQUcsSUFBSSxzQkFBVyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNGLE1BQU0sQ0FBQyxJQUFJLHlCQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFDNUQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBIdG1sQXN0LFxuICBIdG1sQXN0VmlzaXRvcixcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxBdHRyQXN0LFxuICBIdG1sVGV4dEFzdCxcbiAgSHRtbENvbW1lbnRBc3QsXG4gIEh0bWxFeHBhbnNpb25Bc3QsXG4gIEh0bWxFeHBhbnNpb25DYXNlQXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfYXN0JztcblxuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5cbi8qKlxuICogRXhwYW5kcyBzcGVjaWFsIGZvcm1zIGludG8gZWxlbWVudHMuXG4gKlxuICogRm9yIGV4YW1wbGUsXG4gKlxuICogYGBgXG4gKiB7IG1lc3NhZ2VzLmxlbmd0aCwgcGx1cmFsLFxuICogICA9MCB7emVyb31cbiAqICAgPTEge29uZX1cbiAqICAgPW90aGVyIHttb3JlIHRoYW4gb25lfVxuICogfVxuICogYGBgXG4gKlxuICogd2lsbCBiZSBleHBhbmRlZCBpbnRvXG4gKlxuICogYGBgXG4gKiA8dWwgW25nUGx1cmFsXT1cIm1lc3NhZ2VzLmxlbmd0aFwiPlxuICogICA8dGVtcGxhdGUgW25nUGx1cmFsQ2FzZV09XCIwXCI+PGxpIGkxOG49XCJwbHVyYWxfMFwiPnplcm88L2xpPjwvdGVtcGxhdGU+XG4gKiAgIDx0ZW1wbGF0ZSBbbmdQbHVyYWxDYXNlXT1cIjFcIj48bGkgaTE4bj1cInBsdXJhbF8xXCI+b25lPC9saT48L3RlbXBsYXRlPlxuICogICA8dGVtcGxhdGUgW25nUGx1cmFsQ2FzZV09XCJvdGhlclwiPjxsaSBpMThuPVwicGx1cmFsX290aGVyXCI+bW9yZSB0aGFuIG9uZTwvbGk+PC90ZW1wbGF0ZT5cbiAqIDwvdWw+XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZE5vZGVzKG5vZGVzOiBIdG1sQXN0W10pOiBFeHBhbnNpb25SZXN1bHQge1xuICBsZXQgZSA9IG5ldyBfRXhwYW5kZXIoKTtcbiAgbGV0IG4gPSBodG1sVmlzaXRBbGwoZSwgbm9kZXMpO1xuICByZXR1cm4gbmV3IEV4cGFuc2lvblJlc3VsdChuLCBlLmV4cGFuZGVkKTtcbn1cblxuZXhwb3J0IGNsYXNzIEV4cGFuc2lvblJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlczogSHRtbEFzdFtdLCBwdWJsaWMgZXhwYW5kZWQ6IGJvb2xlYW4pIHt9XG59XG5cbmNsYXNzIF9FeHBhbmRlciBpbXBsZW1lbnRzIEh0bWxBc3RWaXNpdG9yIHtcbiAgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHZpc2l0RWxlbWVudChhc3Q6IEh0bWxFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBuZXcgSHRtbEVsZW1lbnRBc3QoYXN0Lm5hbWUsIGFzdC5hdHRycywgaHRtbFZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbiksIGFzdC5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN0LnN0YXJ0U291cmNlU3BhbiwgYXN0LmVuZFNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRBdHRyKGFzdDogSHRtbEF0dHJBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBhc3Q7IH1cblxuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGFzdDsgfVxuXG4gIHZpc2l0Q29tbWVudChhc3Q6IEh0bWxDb21tZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gYXN0OyB9XG5cbiAgdmlzaXRFeHBhbnNpb24oYXN0OiBIdG1sRXhwYW5zaW9uQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgIHJldHVybiBhc3QudHlwZSA9PSBcInBsdXJhbFwiID8gX2V4cGFuZFBsdXJhbEZvcm0oYXN0KSA6IF9leHBhbmREZWZhdWx0Rm9ybShhc3QpO1xuICB9XG5cbiAgdmlzaXRFeHBhbnNpb25DYXNlKGFzdDogSHRtbEV4cGFuc2lvbkNhc2VBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJTaG91bGQgbm90IGJlIHJlYWNoZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2V4cGFuZFBsdXJhbEZvcm0oYXN0OiBIdG1sRXhwYW5zaW9uQXN0KTogSHRtbEVsZW1lbnRBc3Qge1xuICBsZXQgY2hpbGRyZW4gPSBhc3QuY2FzZXMubWFwKGMgPT4ge1xuICAgIGxldCBleHBhbnNpb25SZXN1bHQgPSBleHBhbmROb2RlcyhjLmV4cHJlc3Npb24pO1xuICAgIGxldCBpMThuQXR0cnMgPSBleHBhbnNpb25SZXN1bHQuZXhwYW5kZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxuICAgICAgICAgICAgICAgICAgICAgICAgW25ldyBIdG1sQXR0ckFzdChcImkxOG5cIiwgYCR7YXN0LnR5cGV9XyR7Yy52YWx1ZX1gLCBjLnZhbHVlU291cmNlU3BhbildO1xuXG4gICAgcmV0dXJuIG5ldyBIdG1sRWxlbWVudEFzdChgdGVtcGxhdGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgSHRtbEF0dHJBc3QoXCJuZ1BsdXJhbENhc2VcIiwgYy52YWx1ZSwgYy52YWx1ZVNvdXJjZVNwYW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEh0bWxFbGVtZW50QXN0KGBsaWAsIGkxOG5BdHRycywgZXhwYW5zaW9uUmVzdWx0Lm5vZGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuKTtcbiAgfSk7XG4gIGxldCBzd2l0Y2hBdHRyID0gbmV3IEh0bWxBdHRyQXN0KFwiW25nUGx1cmFsXVwiLCBhc3Quc3dpdGNoVmFsdWUsIGFzdC5zd2l0Y2hWYWx1ZVNvdXJjZVNwYW4pO1xuICByZXR1cm4gbmV3IEh0bWxFbGVtZW50QXN0KFwidWxcIiwgW3N3aXRjaEF0dHJdLCBjaGlsZHJlbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5zb3VyY2VTcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzdC5zb3VyY2VTcGFuKTtcbn1cblxuZnVuY3Rpb24gX2V4cGFuZERlZmF1bHRGb3JtKGFzdDogSHRtbEV4cGFuc2lvbkFzdCk6IEh0bWxFbGVtZW50QXN0IHtcbiAgbGV0IGNoaWxkcmVuID0gYXN0LmNhc2VzLm1hcChjID0+IHtcbiAgICBsZXQgZXhwYW5zaW9uUmVzdWx0ID0gZXhwYW5kTm9kZXMoYy5leHByZXNzaW9uKTtcbiAgICBsZXQgaTE4bkF0dHJzID0gZXhwYW5zaW9uUmVzdWx0LmV4cGFuZGVkID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFtdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZXcgSHRtbEF0dHJBc3QoXCJpMThuXCIsIGAke2FzdC50eXBlfV8ke2MudmFsdWV9YCwgYy52YWx1ZVNvdXJjZVNwYW4pXTtcblxuICAgIHJldHVybiBuZXcgSHRtbEVsZW1lbnRBc3QoYHRlbXBsYXRlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEh0bWxBdHRyQXN0KFwibmdTd2l0Y2hXaGVuXCIsIGMudmFsdWUsIGMudmFsdWVTb3VyY2VTcGFuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBIdG1sRWxlbWVudEFzdChgbGlgLCBpMThuQXR0cnMsIGV4cGFuc2lvblJlc3VsdC5ub2RlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3Bhbik7XG4gIH0pO1xuICBsZXQgc3dpdGNoQXR0ciA9IG5ldyBIdG1sQXR0ckFzdChcIltuZ1N3aXRjaF1cIiwgYXN0LnN3aXRjaFZhbHVlLCBhc3Quc3dpdGNoVmFsdWVTb3VyY2VTcGFuKTtcbiAgcmV0dXJuIG5ldyBIdG1sRWxlbWVudEFzdChcInVsXCIsIFtzd2l0Y2hBdHRyXSwgY2hpbGRyZW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Quc291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3Quc291cmNlU3Bhbik7XG59Il19
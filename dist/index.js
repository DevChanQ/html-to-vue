var $c5L0i$htmlparsestringify2 = require("html-parse-stringify2");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "renderHtml", () => $43d7963e56408b24$export$9da576b8d2431e13);
$parcel$export(module.exports, "getOptionsFromNode", () => $20b4a97a61b3fccb$export$a6aa417b7524e033);
/**
 * Simple clone
 * @param obj
 * @returns {any}
 */ function $20b4a97a61b3fccb$export$629a2bd3f5a49ecc(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function $20b4a97a61b3fccb$export$a6aa417b7524e033(node) {
    return $20b4a97a61b3fccb$export$629a2bd3f5a49ecc(node.attrs);
}



/**
 * Visit each node in the AST - with callback (adapted from https://lihautan.com/manipulating-ast-with-javascript/)
 * @param {*} ast html-parse-stringify AST
 * @param {*} callback
 */ function $9953f5d88a4d2319$var$_visitAST(ast, callback) {
    function _visit(node, parent, key, index) {
        callback(node, parent, key, index);
        if (Array.isArray(node)) // node is an array
        node.forEach((value, index)=>{
            _visit.call(this, value, node, null, index);
        });
        else if ($9953f5d88a4d2319$export$8ee0fc9ee280b4ee(node)) {
            const keys = Object.keys(node);
            for(let i = 0; i < keys.length; i++){
                const child = node[keys[i]];
                if (Array.isArray(child)) for(let j = 0; j < child.length; j++)_visit.call(this, child[j], node, key, j);
                else if ($9953f5d88a4d2319$export$8ee0fc9ee280b4ee(child)) _visit.call(this, child, node, key);
            }
        }
    }
    _visit.call(this, ast, null);
}
function $9953f5d88a4d2319$export$8ee0fc9ee280b4ee(node) {
    return typeof node === 'object' && typeof node.type !== 'undefined';
}
function $9953f5d88a4d2319$export$c1bc323f24335e43(html) {
    return $c5L0i$htmlparsestringify2.parse(html);
}
function $9953f5d88a4d2319$export$7d3b28cc14acaaaa(ast, config) {
    const _ast = (0, $20b4a97a61b3fccb$export$629a2bd3f5a49ecc)(ast);
    const keys = config.extraComponentsMap ? Object.keys(config.extraComponentsMap) : [];
    $9953f5d88a4d2319$var$_visitAST(_ast, (node, parent, key, index)=>{
        // checking whether the AST has some components that has to become Vue Components
        for(let i = 0; i < keys.length; i++){
            const currentKey = keys[i];
            if (config.extraComponentsMap[currentKey].conditions(node)) node.name = currentKey;
        }
    });
    return _ast;
}




function $dbcf8e2ba92c4b72$export$e30378e28ad3e6ab(ast, config, h) {
    function _render(node, parent, key, index) {
        if (Array.isArray(node)) {
            const nodes = [];
            // node is an array
            node.forEach((subnode, index)=>{
                nodes.push(_render(subnode, node, null, index));
            });
            return nodes;
        } else if ((0, $9953f5d88a4d2319$export$8ee0fc9ee280b4ee)(node)) {
            // node is either a node with children or a node or a text node
            if (node.type === 'text') return config.textTransformer(node.content) // return text
            ;
            if (node.type === 'tag') {
                const children = [];
                node.children.forEach((child, index)=>{
                    children.push(_render(child, node, null, index));
                });
                // if it's an extra component use custom renderer
                if (typeof config.config.extraComponentsMap[node.name] !== 'undefined') {
                    const comp = config.config.extraComponentsMap[node.name];
                    return h(comp, (0, $20b4a97a61b3fccb$export$a6aa417b7524e033)(node), [
                        ...children
                    ]);
                }
                // else, create normal html element
                return h(node.name, (0, $20b4a97a61b3fccb$export$a6aa417b7524e033)(node), [
                    ...children
                ]);
            }
        }
    }
    return ()=>h("div", {}, _render(ast, null, null, 0));
}



const $43d7963e56408b24$var$defaultConfig = {
    container: {
        type: 'div'
    },
    extraComponentsMap: {},
    renderAnyway: false,
    textTransformer: (text)=>text
};
function $43d7963e56408b24$export$9da576b8d2431e13(html, config, h) {
    const _c = Object.assign($43d7963e56408b24$var$defaultConfig, config);
    const _ast = (0, $9953f5d88a4d2319$export$c1bc323f24335e43)(html);
    const _rectifiedAst = (0, $9953f5d88a4d2319$export$7d3b28cc14acaaaa)(_ast, config);
    return (0, $dbcf8e2ba92c4b72$export$e30378e28ad3e6ab)(_rectifiedAst, _c, h);
}


//# sourceMappingURL=index.js.map

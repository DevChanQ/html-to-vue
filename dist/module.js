import {parse as $bdjGp$parse} from "html-parse-stringify2";

/**
 * Simple clone
 * @param obj
 * @returns {any}
 */ function $bc68805842a7be7a$export$629a2bd3f5a49ecc(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function $bc68805842a7be7a$export$a6aa417b7524e033(node) {
    return $bc68805842a7be7a$export$629a2bd3f5a49ecc(node.attrs);
}



/**
 * Visit each node in the AST - with callback (adapted from https://lihautan.com/manipulating-ast-with-javascript/)
 * @param {*} ast html-parse-stringify AST
 * @param {*} callback
 */ function $a5f2d3c7bac834e6$var$_visitAST(ast, callback) {
    function _visit(node, parent, key, index) {
        callback(node, parent, key, index);
        if (Array.isArray(node)) // node is an array
        node.forEach((value, index)=>{
            _visit.call(this, value, node, null, index);
        });
        else if ($a5f2d3c7bac834e6$export$8ee0fc9ee280b4ee(node)) {
            const keys = Object.keys(node);
            for(let i = 0; i < keys.length; i++){
                const child = node[keys[i]];
                if (Array.isArray(child)) for(let j = 0; j < child.length; j++)_visit.call(this, child[j], node, key, j);
                else if ($a5f2d3c7bac834e6$export$8ee0fc9ee280b4ee(child)) _visit.call(this, child, node, key);
            }
        }
    }
    _visit.call(this, ast, null);
}
function $a5f2d3c7bac834e6$export$8ee0fc9ee280b4ee(node) {
    return typeof node === 'object' && typeof node.type !== 'undefined';
}
function $a5f2d3c7bac834e6$export$c1bc323f24335e43(html) {
    return $bdjGp$parse(html);
}
function $a5f2d3c7bac834e6$export$7d3b28cc14acaaaa(ast, config) {
    const _ast = (0, $bc68805842a7be7a$export$629a2bd3f5a49ecc)(ast);
    const keys = config.extraComponentsMap ? Object.keys(config.extraComponentsMap) : [];
    $a5f2d3c7bac834e6$var$_visitAST(_ast, (node, parent, key, index)=>{
        // checking whether the AST has some components that has to become Vue Components
        for(let i = 0; i < keys.length; i++){
            const currentKey = keys[i];
            if (config.extraComponentsMap[currentKey].conditions(node)) node.name = currentKey;
        }
    });
    return _ast;
}




function $05960ed3de917b87$export$e30378e28ad3e6ab(ast, config, h) {
    function _render(node, parent, key, index) {
        if (Array.isArray(node)) {
            const nodes = [];
            // node is an array
            node.forEach((subnode, index)=>{
                nodes.push(_render(subnode, node, null, index));
            });
            return nodes;
        } else if ((0, $a5f2d3c7bac834e6$export$8ee0fc9ee280b4ee)(node)) {
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
                    return h(comp, (0, $bc68805842a7be7a$export$a6aa417b7524e033)(node), [
                        ...children
                    ]);
                }
                // else, create normal html element
                return h(node.name, (0, $bc68805842a7be7a$export$a6aa417b7524e033)(node), [
                    ...children
                ]);
            }
        }
    }
    return ()=>h("div", {}, _render(ast, null, null, 0));
}



const $747425b437e121da$var$defaultConfig = {
    container: {
        type: 'div'
    },
    extraComponentsMap: {},
    renderAnyway: false,
    textTransformer: (text)=>text
};
function $747425b437e121da$export$9da576b8d2431e13(html, config, h) {
    const _c = Object.assign($747425b437e121da$var$defaultConfig, config);
    const _ast = (0, $a5f2d3c7bac834e6$export$c1bc323f24335e43)(html);
    const _rectifiedAst = (0, $a5f2d3c7bac834e6$export$7d3b28cc14acaaaa)(_ast, config);
    return (0, $05960ed3de917b87$export$e30378e28ad3e6ab)(_rectifiedAst, _c, h);
}


export {$747425b437e121da$export$9da576b8d2431e13 as renderHtml, $bc68805842a7be7a$export$a6aa417b7524e033 as getOptionsFromNode};
//# sourceMappingURL=module.js.map

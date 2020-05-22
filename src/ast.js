import { cloneDeep } from "./helpers";
const parser = require('html-parse-stringify2')

/**
 * Visit each node in the AST - with callback (adapted from https://lihautan.com/manipulating-ast-with-javascript/)
 * @param {*} ast html-parse-stringify AST
 * @param {*} callback
 */
function _visitAST (ast, callback) {
  function _visit(node, parent, key, index) {
    callback(node, parent, key, index)
    if (Array.isArray(node)) {
      // node is an array
      node.forEach((value, index) => {
        _visit.call(this, value, node, null, index)
      })
    } else if (isNode(node)) {
      const keys = Object.keys(node)
      for (let i = 0; i < keys.length; i++) {
        const child = node[keys[i]]
        if (Array.isArray(child)) {
          for (let j = 0; j < child.length; j++) {
            _visit.call(this, child[j], node, key, j)
          }
        } else if (isNode(child)) {
          _visit.call(this, child, node, key)
        }
      }
    }
  }
  _visit.call(this, ast, null)
}

/**
 *
 * @param node html-parse-stringify AST node
 * @returns {boolean|boolean}
 */
export function isNode(node) {
  return typeof node === 'object' && typeof node.type !== 'undefined'
}

export function generateAST (html) {
  return parser.parse(html)
}

/**
 * Converts ast html nodes in vue components
 * @param ast
 * @param config
 * @returns {*}
 */
export function rectifyAST (ast, config) {
  const _ast = cloneDeep(ast)
  const keys = Object.keys(config.extraComponentsMap)
  _visitAST(_ast, (node, parent, key, index) => {
    // checking whether the AST has some components that has to become Vue Components
    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i]
      if (config.extraComponentsMap[currentKey].conditions(node)) {
        node.name = currentKey
      }
    }
  })
  return _ast
}
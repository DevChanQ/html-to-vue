/**
 * Simple clone
 * @param obj
 * @returns {any}
 */
export function cloneDeep (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Get vue-complient options from node attributes
 * @param node
 * @returns {{style: String, class: String, attrs: Object}}
 */
export function getOptionsFromNode(node) {
  return cloneDeep(node.attrs);
}
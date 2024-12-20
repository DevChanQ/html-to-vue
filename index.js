import sanitizeHtml from 'sanitize-html';

import { generateAST } from "./src/ast";
import { renderer } from "./src/renderer";
// import { version } from './package.json';

const defaultConfig = {
  container: {
    type: 'div'
  },
  extraComponentsMap: {},
  renderAnyway: false,
  textTransformer: text => text
}

export const renderHtml = (html, c, h) => {
  const config = { ...(c ?? {}) }

  // convert component names to lower case
  if (config.extraComponentsMap) {
    const newMap = {}
    Object.keys(config.extraComponentsMap).forEach(key => {
      newMap[key.toLowerCase()] = config.extraComponentsMap[key]
    })
    config.extraComponentsMap = newMap
  }

  // include lower case tags
  let tags = config.extraComponentsMap ? Object.keys(config.extraComponentsMap) : [];
  
  const sanitizeConfig = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(tags),
    selfClosing: sanitizeHtml.defaults.selfClosing.concat(tags),
    allowedAttributes: false
  };
  const sanitizedHtml = sanitizeHtml(html, sanitizeConfig)
  
  const _c = Object.assign(defaultConfig, config)
  const _ast = generateAST(sanitizedHtml)

  return renderer(_ast, _c, h)
}

export { getOptionsFromNode } from "./src/helpers"
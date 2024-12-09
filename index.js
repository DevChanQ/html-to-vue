import { generateAST, rectifyAST } from "./src/ast";
import { renderer } from "./src/renderer";

const defaultConfig = {
  container: {
    type: 'div'
  },
  extraComponentsMap: {},
  renderAnyway: false,
  textTransformer: text => text
}

export const renderHtml = (html, config, h) => {
  const _c = Object.assign(defaultConfig, config)
  const _ast = generateAST(html)
  const _rectifiedAst = rectifyAST(_ast, config)

  return renderer(_rectifiedAst, _c, h)
}

export { getOptionsFromNode } from "./src/helpers"
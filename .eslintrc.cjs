/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-10-23 09:31:18
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-12-19 15:54:30
 * @FilePath: \vite-vue3-temp\.eslintrc.cjs
 * @Description:
 *
 */

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

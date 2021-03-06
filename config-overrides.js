const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = override(
  // 针对antd实现按需打包
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1890ff' },
  })
)

// Stylelint 配置文件，用于检查和格式化 CSS/SCSS 样式代码
module.exports = {
  // 继承的预设配置
  extends: [
    'stylelint-config-recommended', // 官方推荐的基本配置
    'stylelint-config-recommended-scss', // SCSS 推荐配置
    'stylelint-config-recommended-vue/scss', // Vue 中 SCSS 的推荐配置
    'stylelint-config-html/vue', // Vue 模板中样式配置
    'stylelint-config-recess-order', // 使用 recess 规则对属性进行排序
  ],

  // 使用的插件
  plugins: ['stylelint-prettier'], // 集成 prettier 进行代码格式化

  // 针对特定文件类型的覆盖配置
  overrides: [
    {
      files: ['**/*.{vue,html}'], // 匹配 vue 和 html 文件
      customSyntax: 'postcss-html', // 使用 postcss-html 语法解析器
    },
    {
      files: ['**/*.{css,scss}'], // 匹配 css 和 scss 文件
      customSyntax: 'postcss-scss', // 使用 postcss-scss 语法解析器
    },
  ],

  // 自定义规则
  rules: {
    'block-no-empty': null, // 允许空的CSS块
    'import-notation': 'string', // 要求使用字符串形式的 import 语句
    'selector-class-pattern': null, // 不对类选择器命名规则进行检查
    'custom-property-pattern': null, // 不对自定义属性命名规则进行检查
    'keyframes-name-pattern': null, // 不对关键帧名称命名规则进行检查
    'no-descending-specificity': null, // 允许选择器特异性降序排列
    'no-empty-source': null, // 允许空的源文件
    'scss/load-partial-extension': 'always', // 在@import中使用扩展名

    // 未知类型选择器的处理规则
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [],
      },
    ],

    // 未知伪类选择器的处理规则
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'deep'], // 忽略 global、export、deep 伪类
      },
    ],

    // 未知单位的处理规则
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'], // 忽略微信小程序的 rpx 单位
      },
    ],

    // 未知属性的处理规则
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [], // 不忽略任何未知属性
      },
    ],

    // 未知 at 规则的处理规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'use', 'forward'], // 忽略 apply、use、forward 规则
      },
    ],
  },
};

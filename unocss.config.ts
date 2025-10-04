import presetWeapp from 'unocss-preset-weapp';
import {
  extractorAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer';
import { presetIcons } from 'unocss';

// 解构获取微信小程序的属性化预设和转换器
const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

export default {
  presets: [
    // 微信小程序预设，适配小程序环境
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // 属性化预设，支持attributify模式
    presetWeappAttributify(),
    // 图标预设，用于使用图标类
    presetIcons({
      // 图标缩放比例，设置为1.2表示图标将比默认大小放大1.2倍
      scale: 1.2,

      // 额外的CSS属性，会应用到所有图标元素上
      extraProperties: {
        // 设置图标显示方式为内联块级元素
        // 这样图标既可以设置宽高，又不会独占一行
        display: 'inline-block',

        // 设置图标垂直对齐方式为居中对齐
        // 这样图标会与文本基线对齐，看起来更美观
        'vertical-align': 'middle',
      },
    }),
  ],
  // 自定义样式
  shortcuts: [
    {
      // flex布局居中对齐快捷类
      'flex-center': 'flex justify-center items-center',
      // flex布局左对齐
      'flex-start': 'flex justify-start items-center',
      // flex布局右对齐
      'flex-end': 'flex justify-end items-center',
      // flex布局两端对齐
      'flex-between': 'flex justify-between items-center',
      // flex布局环绕对齐
      'flex-around': 'flex justify-around items-center',
      // flex布局平均分布
      'flex-evenly': 'flex justify-evenly items-center',
      // flex布局拉伸对齐
      'flex-stretch': 'flex justify-stretch items-center',
      // flex布局基线对齐
      'flex-baseline': 'flex justify-baseline items-center',
      // 垂直布局
      'flex-column': 'flex flex-col',
      // 水平布局（默认）
      'flex-row': 'flex flex-row',
      // 垂直布局并居中对齐
      'flex-col-center': 'flex flex-col items-center',
    },
  ],

  // 配置转换器
  transformers: [
    // 属性化转换器，处理attributify模式
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // 类名转换器，处理类名转换
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
};

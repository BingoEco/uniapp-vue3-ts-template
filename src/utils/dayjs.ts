// utils/dayjs.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

// 1、配置插件（只执行一次）
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

// 2、封装增强版相对时间函数（可选）
export function formatRelativeTime(date: string | number | Date): string {
  const now = dayjs();
  const target = dayjs(date);
  const diffMinutes = now.diff(target, 'minute');

  if (diffMinutes < 5) return '刚刚';
  if (diffMinutes < 60) return `${diffMinutes}分钟前`;
  if (diffMinutes < 60 * 24) return `${Math.floor(diffMinutes / 60)}小时前`;

  // 超过1天，交给 dayjs 的 fromNow（会显示“1天前”、“2天前”...）
  return target.fromNow();
}

// 3、同时导出配置好的 dayjs 实例（供其他场景使用）
export default dayjs;

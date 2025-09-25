import moment from 'moment';

// 替换 dateMath.parse 功能
export function parseDateMath(expression, options = {}) {
  const { roundUp = false } = options;
  
  if (!expression || typeof expression !== 'string') {
    return null;
  }
  
  // 处理 "now" 表达式
  if (expression === 'now') {
    return moment();
  }
  
  // 处理相对时间表达式，如 "now-15m", "now+1h", "now/d" 等
  const nowRegex = /^now([+-]\d+[smhdwMy])?(\/(s|m|h|d|w|M|y))?$/;
  const match = expression.match(nowRegex);
  
  if (match) {
    let result = moment();
    
    // 处理偏移量，如 "-15m", "+1h"
    if (match[1]) {
      const offsetMatch = match[1].match(/([+-])(\d+)([smhdwMy])/);
      if (offsetMatch) {
        const [, sign, amount, unit] = offsetMatch;
        const value = parseInt(amount, 10) * (sign === '+' ? 1 : -1);
        result = result.add(value, unit);
      }
    }
    
    // 处理舍入，如 "/d", "/h"
    if (match[2]) {
      const roundUnit = match[3];
      if (roundUp) {
        result = result.endOf(roundUnit);
      } else {
        result = result.startOf(roundUnit);
      }
    }
    
    return result;
  }
  
  // 尝试解析为绝对时间
  const parsed = moment(expression);
  return parsed.isValid() ? parsed : null;
}
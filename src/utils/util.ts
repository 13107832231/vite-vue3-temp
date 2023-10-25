/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-10-20 14:56:14
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-10-24 15:41:46
 * @FilePath: \vite-vue3-temp\src\utils\util.ts
 * @Description: 
 * 
 */
export function base64ToFile(base64: any) {
  // const name = new Date().getTime() + Math.floor(Math.random() * 999);
  const name = '图片1'
  if (typeof base64 != 'string') {
    return
  }
  var arr = base64.split(',')
  var type = arr[0].match(/:(.*?);/)[1]
  var fileExt = type.split('/')[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${name}.` + fileExt, {
    type: type
  })
}
export function urlToFile(url: string) {
  const name = '图片1'
  return new Promise((resolve, reject) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader('Accept', 'image/png');
    xhr.responseType = "blob";
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response;
      let file = new File([blob], `${name}.png`, { type: 'image/png' });
      // 返回结果
      resolve(file);
    };
    xhr.onerror = (e) => {
      reject(e)
    };
    // 发送
    xhr.send();
  });
}



export function isBase64(str: string) {
  if (str.indexOf('data:') != -1 && str.indexOf('base64') != -1) {
    return true
  } else {
    return false
  }
}

export function caculateTimeago(dateTimeStamp: number) {

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  let result = '';

  if (diffValue < 0) {
    return;
  }
  const minC = diffValue / minute;
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  if (weekC >= 1 && weekC <= 4) {
    result = ` ${parseInt(`${weekC}`, 10)} 周前`;
  } else if (dayC >= 1 && dayC <= 6) {
    result = ` ${parseInt(`${dayC}`, 10)} 天前`;
  } else if (hourC >= 1 && hourC <= 23) {
    result = ` ${parseInt(`${hourC}`, 10)} 小时前`;
  } else if (minC >= 1 && minC <= 59) {
    result = ` ${parseInt(`${minC}`, 10)} 分钟前`;
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = `刚刚`;
  } else {
    const datetime = new Date();
    datetime.setTime(dateTimeStamp);
    const Nyear = datetime.getFullYear();
    const Nmonth = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() + 1;
    const Ndate = datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
    result = `${Nyear}-${Nmonth}-${Ndate}`;
  }
  return result;
}
export function calculateTimestamp(timestamp: number) {
  const todayZero = new Date().setHours(0, 0, 0, 0);
  const thisYear = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
  const target = new Date(timestamp);

  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneYear = 365 * oneDay;

  const diff = todayZero - target.getTime();

  function formatNum(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  if (diff <= 0) {
    // today, only display hour:minute
    return `${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (diff <= oneDay) {
    // yesterday, display yesterday:hour:minute
    return `昨天 ${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (diff <= oneWeek - oneDay) {
    // Within a week, display weekday hour:minute
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[target.getDay()];
    return `${weekday} ${formatNum(target.getHours())}:${formatNum(target.getMinutes())}`;
  } else if (target.getTime() >= thisYear) {
    // Over a week, within this year, display mouth/day hour:minute
    return `${target.getMonth() + 1}/${target.getDate()} ${formatNum(target.getHours())}:${formatNum(
      target.getMinutes()
    )}`;
  } else {
    // Not within this year, display year/mouth/day hour:minute
    return `${target.getFullYear()}/${target.getMonth() + 1}/${target.getDate()} ${formatNum(
      target.getHours()
    )}:${formatNum(target.getMinutes())}`;
  }
}




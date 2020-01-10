export function handleHttps(url: string) {
  // if (url.startsWith("https")) {
  //   return url.replace("https", "http");
  // }
    let rUrl=url;
    if (url.startsWith("https:")) {
        rUrl= url.replace("https:", "");
    }else if (url.startsWith("http:")) {
        rUrl= url.replace("http:", "");
    }
    // console.log(rUrl)
  return rUrl;
}

export function handleDate(item: any) {
  let actionText = "";
  let time = "";
  if (item.get("source") == "CREATE") {
    actionText = item.get("modifyTime") ? "更新" : "创建";
    time = item.get("modifyTime")
      ? item.get("modifyTime")
      : item.get("createTime");
  } else if (item.get("source") == "UPLOAD") {
    actionText = item.get("modifyTime") ? "更新" : "上传";
    time = item.get("modifyTime")
      ? item.get("modifyTime")
      : item.get("uploadTime");
  } else if (item.get("source") == "COLLECT") {
    actionText = item.get("modifyTime") ? "更新" : "保存";
    time = item.get("modifyTime")
      ? item.get("modifyTime")
      : item.get("collectTime");
  }
  return {
    actionText,
    time: subStrDate(time)
  };
}

function subStrDate(date: string) {
  let current = new Date();
  let year = current.getFullYear();
  // 小于10月前面加0
  let month =
    current.getMonth() + 1 > 9
      ? current.getMonth() + 1
      : `0${current.getMonth() + 1}`;
  let day = current.getDate();

  current.setDate(day - 1);
  let yyear = current.getFullYear();
  let ymonth =
    current.getMonth() + 1 > 9
      ? current.getMonth() + 1
      : `0${current.getMonth() + 1}`;
  let yday = current.getDate();

  //昨天 今天 今年
  if (date.startsWith(`${year}-${month}-${day}`)) {
    date = "今天" + date.replace(`${year}-${month}-${day}`, "");
  } else if (date.startsWith(`${yyear}-${ymonth}-${yday}`)) {
    date = "昨天" + date.replace(`${yyear}-${ymonth}-${yday}`, "");
  } else if (date.startsWith(`${year}`)) {
    date = date.replace(`${year}-`, "");
  }

  return date.substr(0, date.length - 3);
}

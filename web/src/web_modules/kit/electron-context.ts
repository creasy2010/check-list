/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/15
 **/

export function loadTask() {
  if (window.checkSdk) {
    return window.checkSdk.dao.taskDao.db;
  } else {
    return [
      {
        id: '123123',
        title: 'teststst',
      },
      {
        id: '1231233423',
        title: 'teststst11',
      },
    ];
  }
}

import * as fs from 'fs-extra';
import * as path from  'path';
//
fs.rmdir(path.join(__dirname, "../../app/dist/static-web"), () => {
  fs.mkdir(path.join(__dirname, "../../app/dist/static-web"), () => {
    copy(
      path.join(__dirname, "../dist"),
      path.join(__dirname, "../../app/dist/static-web")
    );
  });
});

const copy = function(src, dst) {
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function(path) {
    const _src = src + "/" + path;
    const _dst = dst + "/" + path;
    fs.stat(_src, function(err, stats) {
      if (err) throw err;
      if (stats.isFile()) {
        let readable = fs.createReadStream(_src);
        let writable = fs.createWriteStream(_dst);
        readable.pipe(writable);
      } else if (stats.isDirectory()) {
        checkDirectory(_src, _dst, copy);
      }
    });
  });
};
const checkDirectory = function(src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, err => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

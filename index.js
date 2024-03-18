'use strict';

const Promise = require('bluebird');
const upyun = require('upyun');
const fs = require('fs');
const urlParse = require('url').parse;
const moment = require('moment');
const BaseAdapter = require('ghost-storage-base');

console.log('urlParse:', urlParse);
class UpyunAdapter extends BaseAdapter {
  constructor(options) {
    super(options);
    this.options = options || {};
    const bucket = new upyun.Service(this.options.bucket, this.options.operator, this.options.password);
    // console.log('Bucket:', this.options.bucket);
    // console.log('Operator:', this.options.operator);
    console.log('domain:', this.options.domain);
    this.client = new upyun.Client(bucket);
  }



  /**
   * 保存
   * @param file
   * @param targetDir
   * @returns {*}
   */
  save(file, targetDir) {
    const client = this.client;
    const _this = this;

    return new Promise(function(resolve, reject) {
      const remotePath = _this.getRemotePath(file);
      const remoteDomain = _this.options.domain;
      client.putFile(remotePath, fs.readFileSync(file.path)).then(function(result) {
        if (_this.options.suffix !== undefined) {
          resolve(remoteDomain + remotePath + _this.options.suffix);
        } else {
          resolve(remoteDomain + remotePath);
        }
      }).catch(function(error) {
        reject('[' + result.data.code + '] ' + result.data.msg);
      });
    });
  }
//   save(file, targetDir) {
// //   if (this.isSaveExecuted) {
// //       console.log('save function is already executed'); // 在第二次执行时进行拦截并输出提示信息
// //       return Promise.resolve(); // 返回一个已解析的 Promise，表示第二次执行被拦截
// //     }

// //   this.isSaveExecuted = true; // 设置标志位，表示 save 函数已执行过
      
      
//   const client = this.client;
//   const _this = this;
//   console.log('file:', file);

//   return new Promise(function(resolve, reject) {
//     const remotePath = _this.getRemotePath(file);
//     const remoteDomain = _this.options.domain;

//     fs.readFile(file.path, function(error, data) {
//       if (error) {
//         reject(error);
//         return;
//       }

//       client.putFile(remotePath, data)
//         .then(function(result) {
//           if (_this.options.suffix !== undefined) {
//             resolve(remoteDomain + remotePath + _this.options.suffix);
//           } else {
//             resolve(remoteDomain + remotePath);
//           }
//         })
//         .catch(function(error) {
//           reject('[' + error.code + '] ' + error.message);
//         });
//     });
//   });
// }



  /**
   * @param filename
   * @param targetDir
   * @returns {*|bluebird}
   * TODO: 如果设置了fileKey选项，则应使用key检查文件是否存在
   */
  exists(filename, targetDir) {
    return new Promise(function(resolve, reject) {
      resolve(false);
    });
  }

  // 中间件
  serve() {
    // a no-op, these are absolute URLs
    return function(req, res, next) {
      next();
    };
  }

  /**
   * 删
   * @description 并没有真正从Upyun中删除，有时间再搞
   * @param fileName
   * @param targetDir
   * @returns {*|bluebird}
   */
  delete(fileName, targetDir) {

    return new Promise(function(resolve, reject) {
      resolve(true);
    });
  }

  /**
   * 读
   *
   * @param options
   */
  read(options) {
    options = options || {};

    const client = this.client;
    const key = urlParse(options.path).pathname.slice(1);

    return new Promise(function(resolve, reject) {
      client.getFile(key).then(function(result) {
        resolve(result);
      }).catch(function(error) {
        reject('Could not read image');
      });
    });
  }

  getRemotePath(image) {
    const folder = moment().format(this.options.folder || 'YYYY/MM/').replace(/^\//, '');
    console.log('prefix:', this.options.prefix);
    console.log('folder:', folder);
    console.log('name:', image.name);
    return '/' + this.options.prefix + folder + image.name;
  }
}

module.exports = UpyunAdapter;

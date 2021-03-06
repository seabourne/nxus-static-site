/* 
* @Author: Mike Reich
* @Date:   2016-01-25 19:48:45
* @Last Modified 2016-03-01
*/

'use strict';

import _ from 'underscore'
import Promise from 'bluebird'
import fs from 'fs'
import node_path from 'path';
import glob from 'glob';

import Task from '../../Task'

var globAsync = Promise.promisify(glob);

const REGEX_FILE = /[^\/]$/;

export default class FileCollector extends Task {

  _type() {
    return 'collector'
  }

  _processFiles (opts) {
    this.log.debug('Hydrating files')
    let src = fs.realpathSync(opts.source);
    let dest = fs.realpathSync(opts.output);
    opts.files = {};
    return this._getFiles(src, "**/*").each((file) => {
      if(node_path.basename(file)[0] != ".") return this._processFile(file, opts);
    }).catch( (e) => this.log.debug(e));
  }

  _processFile(file, opts) {
    opts.files[file] = file
    return Promise.resolve()
  }

  _getFiles(src, pattern, ignore) {
    var opts = {
      cwd: src,
      dot: true,
      mark: true
    }

    opts.ignore = ignore

    return globAsync(pattern, opts).then((files) => {
      return files.filter(REGEX_FILE.test, REGEX_FILE);
    });
  }
}
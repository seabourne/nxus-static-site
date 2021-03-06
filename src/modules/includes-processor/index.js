/* 
* @Author: Mike Reich
* @Date:   2016-01-26 08:34:41
* @Last Modified 2016-03-01
*/


'use strict';

import _ from 'underscore';
import fm from 'yaml-front-matter';
import node_path from 'path';
import fs from 'fs';
import Promise from 'bluebird';

import Task from '../../Task'

export default class LayoutProcessor extends Task {

  _type() {
    return 'processor'
  }

  _order() {
    return 3
  }

  _processFile(dest, source, opts) {
    if(dest.indexOf('_includes') > -1 ) delete opts.files[dest]
    return Promise.resolve();
  }
}
/* 
* @Author: Mike Reich
* @Date:   2016-01-25 19:47:07
* @Last Modified 2016-05-17
*/

'use strict';

import _ from 'underscore'
import Promise from 'bluebird'
import fse from 'fs-extra';
import node_path from 'path';
import fs from 'fs'
import moment from 'moment'

import {application as app} from 'nxus-core'


Promise.promisifyAll(fse);

import Task from '../../Task'

export default class FeedGenerator extends Task {
  _type() {
    return 'generator'
  }

  _processFiles(opts) {
    return app.get('renderer').request('renderFile', __dirname+"/../../../templates/feed.ejs", {moment, site: opts, config: app.config})
    .then((result) => { 
      fse.outputFileAsync(node_path.join(fs.realpathSync(opts.output), "feed.xml"), result); 
    });
  }
}
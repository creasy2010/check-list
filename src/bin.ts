#!/usr/bin/env node

import {exec} from 'child_process';
import {join} from  'path'


(async()=>{
  exec("./node_modules/electron/cli.js ./lib/main.js",{cwd:join(__dirname,"..")});
})();
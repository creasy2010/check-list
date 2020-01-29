#!/usr/bin/env node
import {join} from  'path'

var electron = require('electron')

var proc = require('child_process')

var child = proc.spawn(electron, [join(__dirname,"./main.js")], { stdio: 'inherit', windowsHide: false })
child.on('close', function (code) {
  process.exit(code)
})

const handleTerminationSignal = function (signal) {
  process.on(signal, function signalHandler () {
    if (!child.killed) {
      child.kill(signal)
    }
  })
}

handleTerminationSignal('SIGINT')
//@ts-ignore
handleTerminationSignal('SIGTERM')
//
// (async()=>{
//   exec("./node_modules/electron/cli.js ./lib/main.js",{cwd:join(__dirname,"..")});
// })();
const fs = require ('fs')
const path = require('path');
const _ = require('underscore');
const counter = require('./counter.js')

module.exports = {
    create : (text,cb)=>{
        counter.getNextUniqueId((err,id)=>{
            let filePath = path.join(exports.dataDir,`${id}.txt`)
            fs.writeFile(filePath, text, (err)=>{
                if(err){
                    cb(err)
                }else{
                    cb(null,{id,text})
                }
            })
        })
    },
    readAll : (cb)=>{
        fs.readdir(exports.dataDir,(err,files)=>{
            let allPromise = files.map((file)=>{
                let id = file.substring(0,5)
                return new Promise((resolve,reject)=>{
                    fs.readFile(path.join(exports.dataDir,`${id}.txt`),'utf-8',(err,text)=>{
                        resolve({id,text})
                    })
                })
            })
            Promise.all(allPromise).then((messages)=>cb(null,messages))
        })

    },
    update : ()=>{

    },
    delete : ()=>{

    }
}

exports.dataDir = path.join(__dirname, 'data');
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
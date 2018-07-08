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
    }
    ,
    readAll : ()=>{

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
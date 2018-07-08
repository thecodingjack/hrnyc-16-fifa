const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = ()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(exports.counterFile,(err,buffer)=>{
            if(err){
                reject(err)
            }else{
                resolve(Number(buffer))
            }
        })
    })
}

const writeCounter = (counter)=>{
    let counterString = zeroPaddedNumber(counter)
    return new Promise((resolve,reject)=>{
        fs.writeFile(exports.counterFile, counterString , (err)=>{
            if(err){
                reject(err)
            }else{
                resolve(counterString)
            }
        })
    })
}

exports.getNextUniqueId = function(cb){
    readCounter().catch(()=>writeCounter(0)).then((counter)=>writeCounter(counter+1))
        .catch((err)=>cb(err)).then((counterString)=>cb(null,counterString))
}

exports.counterFile = path.join(__dirname, 'counter.txt');
const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '입력하자마자 읽어보기')
    .then (()=>{
        return fs.readFile(('./writeme.txt'))
    })
    .then((data)=>{
        console.log(data.toString())
    })
    .catch((err)=>{
        throw err;
    })
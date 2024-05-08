const fs = require('fs')
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16})
//createReadStream이 한번에 읽는 크기가 64KByte이다.
//그래서 일반 텍스트를 넣으면 그냥 한번에 읽혀지기 일수다.
//그러기 대문에 한번에 읽는 크기를 highWaterMark로 16byte로 줄이겠다

const data = []
//나눠서 일처리 시키고
readStream.on('data', (chunk)=>{
    data.push(chunk)
    console.log('data: ', chunk, chunk.length)
})
//순서대로 오는 녀석들을 나중에 합쳐준다.
readStream.on('end', ()=>{
    console.log('end: ', Buffer.concat(data).toString())
})
readStream.on('error', (err)=>{
    console.log('error: ', err)
})
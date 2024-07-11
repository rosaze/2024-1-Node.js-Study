const fs = require('fs')
//파일 압축에 사용하는 라이브러리
const zlib = require('zlib')

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme3.txt')
//16바이트씩 읽어오면서 zlibStream으로 압축 -> 압축한 것을 pipe해서 writeme3.txt에다 써줌
readStream.pipe(zlibStream).pipe(writeStream);
//리드 스트림이랑 라이트 스트림을 파이프로 연결해
//16바이트씩 보내면 16바이트씩 받는다
//그냥 파일 복사는 것이라고 생각하면 된다. (16바이트 씩)
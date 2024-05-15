const buffer = Buffer.from('저를 버퍼로 바꿔보세요')
console.log(buffer)
console.log(buffer.length)
console.log(buffer.toString())

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]
//Buffer.concat으로 여러 Buffer.from을 합쳐주기
console.log(Buffer.concat(array).toString())

//5byte짜리 버퍼 만들기
console.log(Buffer.alloc(5))
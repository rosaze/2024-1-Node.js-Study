//어떤 코드를 만들었는데 그 코드를 잘못 만들었다
// 그 코드를 근데 갑자기 없앨수는 없다
// 왜냐하면 그 코드를 기반으로 만든 다른 코드들이 모두 다 고장나기 때문이다.
// 한번 잘못 만들면 잘못 만든 그대로 유지해야하긴 하는데
// 잘못 만들었다는 내용을 적어야하긴 하니까 deprecated 해준다.

const util = require('util')
const crypto = require('crypto')

/*const dontUseMe = util.deprecate((x,y)=>{
    console.log(x+y)
}, "dontUseMe 함수는 deprecated되었으니 더이상 쓰지 마십시오")
dontUseMe(1,2)*/

const randomBytesPromise = util.promisify(crypto.randomBytes)
randomBytesPromise(64)
.then((buf)=>{
    console.log(buf.toString('base64'))
})
.catch((error)=>{
    console.error(error)
})
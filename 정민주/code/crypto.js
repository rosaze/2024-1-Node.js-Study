const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const key = 'abcdefghijklmnopqrstuvwxzy123456'
const iv = '1234567890123456'

const cipher = crypto.createCipheriv(algorithm, key, iv)
let result = cipher.update('암호화할 문장', 'utf8', 'base64')
result += cipher.final('base64')
console.log('암호화: ', result)

const decipher = crypto.createDecipheriv(algorithm, key, iv)
let result2 = decipher.update(result, 'base64', 'utf8')
result2 += decipher.final('utf8')
console.log('복호화: ', result2)

//같은 key로 암호화, 복호화 한다
//생각보다 취약함. 암호화 자체가 취약한게 아니라
//해커들이 key를 훔쳐가려고 함
//key관리를 잘 해야함
const path = require('path')

const string = __filename

//구분자
console.log('path.sep: ', path.sep)

//환경변수 구분할때 사용하는 delimiter
console.log('path.delimiter: ', path.delimiter)
console.log('---------------------')

//현재 파일명
console.log('__filename: ', string)

//경료명
console.log('path.dirname(): ', path.dirname(string))

//확장자명
console.log('path.extname(): ', path.extname(string))
console.log('path.basename(): ', path.basename(string, path.extname(string)))
console.log('---------------------')
//파일명 요소들 분해
console.log('path.parse()',path.parse(string))

//분해 한 것을 다시 합체
console.log('path.format(): ', path.format({
    dir: 'C:\\users\\zerocho',
    name: 'path',
    ext: '.js',
}))

//포맷을 제대로 만들어줌
console.log('path.normalize(): ', path.normalize('C://users\\\zerocho\\path.js'))
console.log('---------------------')

//절대경로이니?
console.log('path.isAbsolute(C:\\)', path.isAbsolute('C:\\')) //true
console.log('path.isAbsolute(./home): ', path.isAbsolute('./home')) //false
console.log('---------------------')

//한 경로에서 다른 경로로 이동할때 어떤 방식으로 relative하게 이동하는지 보여줌
console.log('path.relative(): ', path.relative('C:\\users\\zerocho\\path.js', 'C:\\'))
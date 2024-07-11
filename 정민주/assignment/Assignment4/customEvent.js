const EventEmitter = require('events')

const events = new EventEmitter()

events.on('sayHello',()=>{
    console.log("Howdy y'll, what ya doing this high noon?")
})
events.on('sayHello', ()=>{
    console.log("Mighty nice to meet ya!")
})
const toBeRemoved = ()=>{
    console.log("Hot Diggidy Dog!")
}
events.on('sayHello', toBeRemoved)
events.emit('sayHello')

events.removeListener('sayHello', toBeRemoved)
events.emit('sayHello')

events.removeAllListeners('sayHello')
events.emit('sayHello')
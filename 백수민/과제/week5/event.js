// 커스텀 이벤트 만들어보기

const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('greet', () => {
    console.log('Hello!');
});

myEvent.on('greet_back', () => {
    console.log('Hi');
});

myEvent.on('greet_back', () => {
    console.log('Nice to to meet you!');
});

myEvent.on('say_goodbye', () => {
    console.log('Me too');
});

myEvent.on('say_goodbye', () => {
    console.log('It was nice talking to you, bye');
});

myEvent.on('say_bye_back', () => {
    console.log('Bye');
});

myEvent.on('say_bye_back', () => {
    console.log('see you later');
});

myEvent.emit('greet');
myEvent.emit('greet_back');
myEvent.emit('say_goodbye');
myEvent.emit('say_bye_back');

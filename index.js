const Observable = require('rxjs/Observable').Observable;

const foo = new Observable((observer) => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
    setTimeout(function() {
        observer.next(4)
        observer.complete()
    }, 1000)
})

foo.subscribe((data) => {
    console.log(`data: ${data}`);
})

console.log('kowaine');
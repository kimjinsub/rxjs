// const Observable = require('rxjs/Observable').Observable;
// // patch Observable with appropriate methods
// require('rxjs/add/observable/of');
// require('rxjs/add/operator/map');
// require('rxjs/add/operator/combineLatest');
const Rx = require('rxjs/Rx')
const axios = require('axios');


const request = function(param) {
    return Rx.Observable.create((observer) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${param}`)
            .then(function(res) {
                // console.log(`_res${param}: ${res.data.id}`)
                observer.next(res.data.id)
                observer.complete()
            })
    })
}

const foo1 = Rx.Observable.combineLatest([
    request('1'),
    request('2'),
    request('3')
])

const foo2 = foo1.map(([res1,res2,res3]) => {
    return [res1,res2,res3].map((x) => x*3);
})

const subscription1 = foo1.subscribe(([res1,res2,res3]) => {
    console.log(`1res1: ${res1}`);
    console.log(`1res2: ${res2}`);
    console.log(`1res3: ${res3}`);
})
const subscription2 = foo2.subscribe(([res1,res2,res3]) => {
    console.log(`2res1: ${res1}`);
    console.log(`2res2: ${res2}`);
    console.log(`2res3: ${res3}`);
})
setTimeout(function() {
    subscription1.unsubscribe();
    console.log('1 구취')
    subscription2.unsubscribe();
    console.log('2 구취')

}, 3000)

// request('1').subscribe((res) => {
//     console.log(`kowaine: ${res}`)
// });
// axios.get('https://jsonplaceholder.typicode.com/posts/5')
//     .then((res) => {
//         console.log(`res: ${JSON.stringify(res.data.id)}`);
//     })
// of([1,2,3]).subscribe((x) => {
//     console.log(`x: ${x}`)
// })
// from([1,2,3]).subscribe((x) => {
//     console.log(`x: ${x}`)
// })
// const foo = new Observable((observer) => {
//     observer.next(1)
//     observer.next(2)
//     observer.next(3)
//     setTimeout(function() {
//         observer.next(4)
//         observer.complete()
//     }, 1000)
// })
//
// foo.subscribe((data) => {
//     console.log(`data: ${data}`);
// })

console.log('kowaine');
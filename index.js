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
                console.log(`_res${param}: ${res.data.id}`)
                observer.next(res.data.id)
                observer.complete()
            })
    })
}

Rx.Observable.combineLatest([
    request('1'),
    request('2'),
    request('3')
]).map(([res1,res2,res3]) => {
    return [res1,res2,res3].map((x) => x*3);
}).subscribe(([res1,res2,res3]) => {
    console.log(`res1: ${res1}`);
    console.log(`res2: ${res2}`);
    console.log(`res3: ${res3}`);
})


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
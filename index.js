// const Observable = require('rxjs/Observable').Observable;
// // patch Observable with appropriate methods
// require('rxjs/add/observable/of');
// require('rxjs/add/operator/map');
// require('rxjs/add/operator/combineLatest');
const Rx = require('rxjs/Rx')
const axios = require('axios');
const {Observable} = require("rxjs");


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

const render = () => {
    _getSearch().subscribe((res) => {
        console.log(res);
    })
}

const _getSearch = () => {
    return Rx.Observable.combineLatest([
        request(1),
        request(2),
        request(3),
    ])
    // .switchMap(([res1,res2,res3]) => {
    //     return Observable.of({kungs: 'kungs'})
    // })
    .switchMap(([res1,res2,res3]) => {
        // return [res1,res2,res3].join(',')
        return _getAddition([res1,res2,res3]).map((res) => {
            return `kowaine: ${res}`
        })
    })
}

const _getAddition = ([res1,res2,res3]) => {
    return _getWirelessAddition([res1,res2,res3]);
}

const _getWirelessAddition = ([res1,res2,res3]) => {
    return Rx.Observable.zip(
        request(res1+res2),
        request(res2+res3),
        request(res3+res1),
        (...resp) => {
            [res4,res5,res6] = resp
            return [res4,res5,res6].join(',')
        }
    )
}

render()


// const foo3 = Rx.Observable.combineLatest([
//     request('1'),
//     request('2'),
//     request('3'),
// ]).subscribe(([res1,res2,res3]) => {
//     console.log(`1: ${[res1,res2,res3].join(',')}`);
//     return Rx.Observable.combineLatest([
//         request(res1 * 2),
//         request(res2 * 2),
//         request(res3 * 2),
//     ])
//     .subscribe(([res4,res5,res6]) => {
//         console.log(`2: ${[res4,res5,res6].join(',')}`);
//
//         return Rx.Observable.combineLatest([
//             request(res4 * 2),
//             request(res5 * 2),
//             request(res6 * 2),
//         ])
//         .subscribe(([res7,res8,res9]) => {
//             console.log(`3res7: ${res7}`);
//             console.log(`3res8: ${res8}`);
//             console.log(`3res9: ${res9}`);
//         })
//     })
// })
// console.log(foo3)
// setTimeout(() => {
//     foo3.unsubscribe();
//     console.log('3 구취')
//     console.log(foo3)
// }, 3000)

// const foo1 = Rx.Observable.combineLatest([
//     request('1'),
//     request('2'),
//     request('3')
// ])
//
// const foo2 = foo1.map(([res1,res2,res3]) => {
//     return [res1,res2,res3].map((x) => x*3);
// })
//
// const subscription1 = foo1.subscribe(([res1,res2,res3]) => {
//     console.log(`1res1: ${res1}`);
//     console.log(`1res2: ${res2}`);
//     console.log(`1res3: ${res3}`);
// })
// const subscription2 = foo2.subscribe(([res1,res2,res3]) => {
//     console.log(`2res1: ${res1}`);
//     console.log(`2res2: ${res2}`);
//     console.log(`2res3: ${res3}`);
// })
// setTimeout(function() {
//     subscription1.unsubscribe();
//     console.log('1 구취')
//     subscription2.unsubscribe();
//     console.log('2 구취')
//
// }, 3000)

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
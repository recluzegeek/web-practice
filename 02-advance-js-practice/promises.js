// let promise = new Promise(function(resolve, reject) {
//   // the function is executed automatically when the promise is constructed

//   // after 1 second signal that the job is done with the result "done"
//   setTimeout(() => resolve("done"), 1000);
// });

// promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('whoops too many errors')
//     }, 1000);
// })

// we collect the results from promises via using `.then` and `.catch`

// promise.then(
//     (result) => console.log(result),
//     (error) => console.log(error)
// )

// ---

console.log('+++++Promises++++');
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = false;
    if (success) {
      resolve("Data successfully fetched!");
    } else {
      reject(new Error("Failed to fetch data."));
    }
  }, 2000);
});

/*
    Promises are used for handling (async typically) operations that may take time and their outcome
    is unknown. A promise in js have three states initially, pending, fullfilled, rejected
    When a promise is constructed, js automatically passes in two callbacks as an argument namely, 
    resolve and reject. The promise  constructor takes an executor function
    which is exectued by js and its outcome decides the result of the promise.
    Only one of the two callbacks can be called or executed from a single promise.

    The promise constructor returns a promise with initial state of pending. We can attach callback states
    to the promise, like `.then` or `.catch`. We can use `.then` for handing both scenarios
    of promise fullfilling or promise rejection whereas `.catch` can only be used for 
    promise rejection. And then, there is a finally state which runs always irrespective of
    the promise state (doesn't matter whether the promise was rejected or fullfilled).

    A finally state can be used for general cleanup operations like cleaning database connecitons,
    stopping indicator or circular loaders once the promise is settled.
*/

myPromise.then(
    result => console.log(result),
    failure => console.log(failure)    
).catch(error =>  {
    console.log(error);
}).finally(() => console.log('I will always run...'))
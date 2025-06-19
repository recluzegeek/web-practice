/*
    Event loop consists of the following components:
        1. Call stack: Executes synchronous code 
        2. Callback Queue: Queues the callbacks for execution, during the execution of an async operation
        3. Event loop: Check if the callback is empty, then fetches callbacks from callback queue

    ## Important Functions/Methods
        1. process.nextTick(): Places callback in seprate queue, which runs before the next event loop cycle
        2. setImmediate(): Queues callback in the next (iteration of) event loop cycle for execution

        **NOTE**: process.nextTick() is of the higher priority then setImmediate(), since it runs before the next event loop cycle, and 
        setImmediate() executes the callback in the next event loop cycle. Whereas, if we don't use either of the methods above, v8 engine
        will decide when will our code be executed, and it may be executed with a delay.

        An event loop iteration (also called a “tick” or “phase”) processes all the callbacks queued in that phase before moving on.

        Each phase has a queue of callbacks (timers, I/O callbacks, idle, etc.), and the event loop runs through these queues in a specific order.
*/

const fs = require('fs');
const crypto = require('crypto');

console.log('Start');

// Microtask queue (nextTick)
process.nextTick(() => console.log('Next Tick 1'));

// Timer queue
setTimeout(() => console.log('Timeout 1'), 0);

fs.readFile('file.txt', () => {
    console.log('First file read');

    // setTimeout(() => {
        setImmediate(() => console.log('Pre Immediate 2 in the setTimeout'))
        process.nextTick(() => console.log('Pre Next Tick 2 in the setTimeOut'))
    // }, 1000);
    
})

// I/O queue
fs.readFile('file.txt', () => {
    console.log('File Read');
    
    // Nested nextTick and setImmediate
    process.nextTick(() => console.log('Next Tick 2'));
    setImmediate(() => console.log('Immediate 1'));
});

// Check queue (setImmediate)
setImmediate(() => console.log('Immediate 2'));

// Close queue
process.on('exit', () => console.log('Exit'));

// Expensive synchronous operation
crypto.pbkdf2Sync('password', 'salt', 100000, 512, 'sha512');
console.log('Crypto');

process.nextTick(() => console.log('Next Tick 3'));
process.nextTick(() => console.log('hello world from the last nexTick. Lets see when i will be executed!'))

console.log('End')

/*
OUTPUT:

$ node 02-advance-js-practice/event-loop.js
Start
Crypto
End
Next Tick 1
Next Tick 3
hello world from the last nexTick. Lets see when i will be executed!
Timeout 1
First file read
Pre Next Tick 2 in the setTimeOut
File Read
Next Tick 2
Immediate 2
Pre Immediate 2 in the setTimeout
Immediate 1
Exit
*/
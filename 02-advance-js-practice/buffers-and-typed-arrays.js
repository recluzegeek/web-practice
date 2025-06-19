/*
    Buffers are raw memory allocations outside V8’s heap, crucial for handling binary data efficiently.
*/

const { log } = require("console");

// Creating a buffer
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.from([1, 2, , 3]); // truncates values >255 to 255
const buf3 = Buffer.from('Hello', 'utf8');

// Writing to a buffer
buf1.write('Hello');
console.log(buf1.toString()); // 'Hello\0\0\0\0\0'

// Reading from a buffer
console.log(buf2.readUInt8(3)); // 2

// Buffer slicing (creates a view, not a copy)
const slice = buf3.subarray(0, 2);
// const slice = buf3.slice(0, 2); depreceated functionality
console.log(slice.toString());
slice[0] = 74; // 'J'
console.log(buf3.toString()); // 'Jello'

// Buffer copying
const bufCopy = Buffer.alloc(5);
buf3.copy(bufCopy);
console.log(bufCopy.toString()); // 'Jello'

// slicing bufCopy to check whether its shallow or deep copy - and its a deep copy
const bufCopySlice = bufCopy.subarray(0)
bufCopySlice[0] = 104 // H -> ASCII Code of H is 104
console.log('Buf Copy: ', bufCopySlice.toString()); // prints hello
console.log('Original Buffer:', buf3.toString()); // prints Jello

// Typed arrays are desgined for handling binary data, whereas regular arrays are for general purpose and can 
// store data type of any type and size (dynamic allocation). TypedArrays (e.g. Uint8Array, Int32Array, Float64Array) have 
// fixed size, type and that can't be changed, like Uint8Array can store 8-bit unsigned integers (0, 255) 


// Using TypedArrays with Buffers
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

const buf4 = Buffer.from(arr.buffer);
console.log(buf4); // <Buffer 88 13 A0 0F>

// Reverse with TypedArray
const numbers = new Uint32Array(buf4.buffer);
console.log(numbers); // Uint32Array [ 5000, 4000 ]
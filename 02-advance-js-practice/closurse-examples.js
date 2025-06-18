function outerFunction(){
    let outerVariable = 'hello world!'
    console.log(outerVariable);
    
    function innerFunction(){
        console.log(outerVariable)
    }

    return innerFunction
}

outerFunction()
// let a = outerFunction()
// a()

// -----------------------------------

// Nested Functions

function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log("Hello, " + getFullName() );
  console.log("Bye, " + getFullName() );
}

sayHiBye('Muhammad', 'Salman')

function makeCounter() {
  let count = 0;

  return function() {
    return ++count;
  };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2
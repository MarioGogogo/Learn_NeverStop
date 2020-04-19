try {
    // Call a non-existing function undefined_Function
    console.log('I am');
    undefined_Function("I'm trying");

    
}
catch(error) {
    // Display the error if statements inside try above fail
    console.log( 'error',error ); // undefined_Function is undefined
}
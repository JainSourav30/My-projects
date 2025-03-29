/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/
function calculatesum(value){
    let sum = 0;
    for(let i =1;i<value;i++){
        sum+=i;
    }
    return sum;
}
function calculateTime(n) {
    const beforedate = new Date();
    const beforetime = beforedate.getTime();

    calculatesum(n);
    const afterdate = new Date();
    const aftertime = afterdate.getTime();

    console.log(aftertime - beforetime);

}

calculateTime(1000000000);
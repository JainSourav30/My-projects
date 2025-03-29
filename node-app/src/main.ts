//LEARNING TS 
// function Greet(firstname: string){
//     console.log("hello " +firstname);
// }
// const fullname = "sourav jain";
// const firstname = fullname.split(' ')[0];
// Greet(firstname);

//---------------------------------------
// function Sum(a:number,b:number): number{ //explicitly defining the return type
//     let c = a+b;
//     return c;
// }

// const ans =Sum(1,2);
// console.log(ans);
//---------------------------------------

//Create a function that takes another function as input, and returns it after 1sec

// function runafter1S(fn:() => void){ // fn which take no input and returns nothing, i.e Void
//     setTimeout(fn,1000);
// }

// runafter1S(function(){
//     console.log("hi there");
// });
//----------------------------------------

// interface User {
//     firstname:string;
//     lastname:string;
//     age:number;
//     email?:string; ///optional argument
// };

// function isLegal(user :User){
//     if(user.age > 18){
//         console.log(`${user.firstname} is legal`);
//     }
// }

// isLegal({
//     firstname:"Sourav",
//     lastname:"jain",
//     age:30
// })
//---------------------------------

//Interface can be implemented as classes buyt types cannot be extended
// type User = {
//     name:string;
//     age:number;
// }
//When to use what
// type stringorNumber = string | number #Interface can't let you do it
// Type Employee , type Manager
// Type teamlead = Employee & Manager # This way team lead can have values defined in both
//-------------------------------------

// enum direction {
//     Up,
//     Down,
//     Left,
//     Right    
// }

// function DoSomething(keypressed : direction){
//     if(keypressed == direction.Down){
//         //Code the logic here
//     }
// }

// DoSomething(direction.Right);


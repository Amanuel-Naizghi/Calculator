let inputBox=document.querySelector("#calculation");
let buttons=document.querySelectorAll("button");
let operatorUsed=false;
let operator=null;//Passes the type of operator used
let num=0;//Stores the new typed number and also it contains the number after operator is used.
let numLoad=0;//Stores the calculated number incase if its is going to be used again.
let countZero=0;//Used for confirming whether 0 is used as an operand since the initial value of num is 0.
let pointUsed=false;//Used for controlling whether the dot(.) is used or not.

buttons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
        let clickedButton=e.target.id;
        if(clickedButton==="Ac"){
            inputBox.value="";
            num=0;
            operatorUsed=false;
            pointUsed=false;
        }
        else if(clickedButton==="del"){
            inputBox.value=inputBox.value.slice(0,-1);
            num=inputBox.value;
        }
        else if(clickedButton==="divide"
        ||clickedButton==="multiply"
        ||clickedButton==="minus"
        ||clickedButton==="add"
        ||clickedButton==="assignment"
        ||clickedButton==="percent"){
            let clickedOperator=e.target.value;
            pointUsed=false;
            if(clickedButton==="percent"&&num!=0){
                num/=100;
                inputBox.value=num;
            }
            //Functions when one operand and one operator is used so that it will store them in numLoad and clear the input screen
            else if((num!=0||countZero!=0)&&!operatorUsed){
                operatorUsed=true;
                numLoad=num+clickedOperator;
                num=0;
                inputBox.value="";
                operator=clickedOperator;
                countZero=0;
            }
            //Functions when two operands and one operator is used
            else if((num!=0||countZero===1)&&(operatorUsed
                ||clickedOperator==="="
                ||clickedOperator==="+"
                ||clickedOperator==="-"
                ||clickedOperator==="*"
                ||clickedOperator==="/")){
               //Functions when two operands and assignment operator is used at the end
               if(clickedOperator==="="){
                    numLoad+=num
                    //Mathematical operation will take place after the function is invoked
                    inputBox.value=operation(numLoad,operator);
                    numLoad=inputBox.value;
                    num=numLoad;
                    operator=null;
                    operatorUsed=false;
               }
               //Functions when two operands and two operators are used
               else if(clickedOperator==="+"
                     ||clickedOperator==="-"
                     ||clickedOperator==="*"
                     ||clickedOperator==="/"){
                    numLoad+=num
                    //Mathematical operation will take place after the function is invoked
                    inputBox.value=operation(numLoad,operator);
                    numLoad=inputBox.value+clickedOperator;
                    num=0;
                    operatorUsed=true;
                    operator=clickedOperator;
               }
               
            }
        }

            else{
                if(num===0){
                    num=e.target.value;
                    if(num==="0"){
                        countZero=1;
                    }
                }
                else if(e.target.value==="."&&!pointUsed){
                    num=num+e.target.value;
                    pointUsed=true;
                }
                else if(pointUsed&&!isNaN(e.target.value)){
                    num+=e.target.value;
                }
                else{
                    num=(num*10)+parseInt(e.target.value);
                }
                inputBox.value=num;
            }
    });
});

function operation(numLoad,operator){
    let operationArray=numLoad.split(operator);
    let num1=parseFloat(operationArray[0]);
    let num2=parseFloat(operationArray[1]);
    let result={
        "+":(num1,num2)=>num1+num2,
        "-":(num1,num2)=>num1-num2,
        "*":(num1,num2)=>num1*num2,
        "/":(num1,num2)=>num1/num2,
    }
    let returnValue= Math.round((result[operator] (num1,num2))*10)/10;
    //Checks whether the value to be returned is infinity or not, if it is infinite that means a number has been divided by 0
    if(returnValue == Number.POSITIVE_INFINITY 
        || returnValue == Number.NEGATIVE_INFINITY){
        return "Can't Divide";
    }
    return returnValue;
}
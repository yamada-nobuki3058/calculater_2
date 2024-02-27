const display = document.getElementById('display');
const sub_display = document.getElementById('sub_display');

let input_number;//入力した数値を代入する変数
let saved_number;//１つ前に入力した数値を保存しておく変数
let input_arithmetic_symbol;//入力した算術記号を代入する変数
let saved_arithmetic_symbol;//１つ前に入力した算術記号を保存しておく変数
let result;//=入力後に計算結果を代入する変数
let intermediate_result;//計算の途中結果を保存しておく変数
let first_number;//式の先頭の数字
let decimal_point_check = false;//小数点があるかどうかを判定する変数
let step_of_calculation = 0;//計算の段階を示す変数
let calculation_order_check = false;//掛け算割り算を優先して計算しなければいけないかを判定する関数

function number_click(value){
  if(result){
    input_number = null;
    if(input_number){
      input_number += value;
    }else{
      input_number = value;
    }
    result = null;
    input_arithmetic_symbol = null;
    first_number = null;
    step_of_calculation = 0;
  }else if(step_of_calculation == 3){
    if(input_number){
      if(input_number != "0"){
        input_number += value;
      }else{
        input_number = value;
      }
    }else{
      input_number = value;
    }
    if( !calculation_order_check){
      first_number = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
      saved_arithmetic_symbol = null;
      intermediate_result = null;
      step_of_calculation = 1;
    }
  }else if(step_of_calculation == 2){
    if(calculation_order_check){
      if(input_number){
        if(input_number != "0"){
          input_number += value;
        }else{
          input_number = value;
        }
      }else{
        input_number = value;
      }
    }else{
      first_number = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(saved_number));
      saved_number = null;
      saved_arithmetic_symbol = null;
      step_of_calculation = 1;
      if(input_number){
        if(input_number != "0"){
          input_number += value;
        }else{
          input_number = value;
        }
      }else{
        input_number = value;
      }
    }
  }else{
    if(input_number){
      if(input_number != "0"){
        input_number += value;
      }else{
        input_number = value;
      }
    }else{
      input_number = value;
    }
  }
  display.textContent = input_number;
  sub_display.textContent = null;
}

function zero_click(value){
  if(result){
    result = null;
    first_number = null;
    input_arithmetic_symbol = null;
    input_number = "0";
  }else if(input_number){
    if(input_number != "0"){
      input_number += value;
    }
  }else{
    input_number = "0";
  }
  display.textContent = input_number;
}

function decimal_point_click(value){
  if( !result){
    if ( !decimal_point_check){
     if(input_number){
        if(input_number != "0"){
          input_number += value;
        }else{
         input_number = "0.";
       }
      }else{
        input_number = "0.";
     }
    }
    decimal_point_check = true;
  }else{
    input_number = "0.";
    decimal_point_check = true;
    result = null;
    input_arithmetic_symbol = null;
    first_number = null;
    step_of_calculation = 0;
  }
  display.textContent = input_number;
}

function arithmetic_button_click(value){
  if(result){
    input_number = null;
    first_number = result;
    input_arithmetic_symbol = change_symbol(value);
    result = null;
    step_of_calculation = 1;
  }else{
    if(step_of_calculation == 3){
      if(input_number){
        saved_number = calculate(Number(intermediate_result) ,input_arithmetic_symbol ,Number(input_number));
        intermediate_result = null;
        input_number =null;
        step_of_calculation = 2;
        input_arithmetic_symbol = change_symbol(value);
        if(input_arithmetic_symbol == "+" || input_arithmetic_symbol == "-"){
          display.textContent = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(saved_number));
          calculation_order_check = false;
        }else{
          display.textContent = saved_number;
          calculation_order_check = true;
        }
      }else{
        input_arithmetic_symbol = change_symbol(value);
        if(input_arithmetic_symbol == "+" || input_arithmetic_symbol =="-"){
          display.textContent = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
          calculation_order_check = false;
        }else{
          display.textContent = intermediate_result;
          calculation_order_check = true;
        }
      }
    }else if(step_of_calculation == 2){
      if(input_number){
        intermediate_result = calculate(Number(saved_number) ,input_arithmetic_symbol ,Number(input_number));
        saved_number = null;
        input_number =null;
        step_of_calculation = 3;
        input_arithmetic_symbol = change_symbol(value);
        if(input_arithmetic_symbol == "+" || input_arithmetic_symbol == "-"){
          display.textContent = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
          calculation_order_check = false;
        }else{
          display.textContent = intermediate_result;
          calculation_order_check = true;
        }
      }else{
        input_arithmetic_symbol = change_symbol(value);
        if(input_arithmetic_symbol == "+" || input_arithmetic_symbol == "-"){
          display.textContent = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(saved_number));
          calculation_order_check = false;
        }else{
          display.textContent = saved_number;
          calculation_order_check = true;
        }
      }
    }else if(step_of_calculation == 1){
      if(input_number){
        saved_arithmetic_symbol = input_arithmetic_symbol;
        saved_number = input_number;
        input_number = null;
        step_of_calculation = 2;
        input_arithmetic_symbol = change_symbol(value);
        if(input_arithmetic_symbol == "+" || input_arithmetic_symbol == "-"){
          display.textContent = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(saved_number));
          calculation_order_check = false;
        }else{
          display.textContent = saved_number;
          calculation_order_check = true;
        }
      }else{
        input_arithmetic_symbol = change_symbol(value);
      }
    }else if(step_of_calculation == 0){
      input_arithmetic_symbol = change_symbol(value);
      if(input_number){
        first_number = input_number;
        input_number = null;
      }else{
        first_number = "0";
      }
      step_of_calculation = 1;
      display.textContent = first_number;
    }
  }
  sub_display.textContent = value;
}

function equal_click(){
  if(result){
    if(input_number){
      result = calculate(Number(result) ,input_arithmetic_symbol ,Number(input_number));
      display.textContent = result;
      sub_display.textContent = null;
    }
  }else if(step_of_calculation == 3){
    if(input_number){
      intermediate_result = calculate(Number(intermediate_result) ,input_arithmetic_symbol ,Number(input_number));
      result = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
      input_number = null;
      input_arithmetic_symbol = null;
      intermediate_result = null;
      saved_arithmetic_symbol = null;
      first_number = null;
    }else if(calculation_order_check){
      input_number = intermediate_result;
      intermediate_result = calculate(Number(intermediate_result) ,input_arithmetic_symbol ,Number(intermediate_result));        result = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
      intermediate_result = null;
      saved_arithmetic_symbol = null;
      first_number = null;
    }else{
      intermediate_result = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
      input_number = intermediate_result;
      result = calculate(Number(intermediate_result) ,input_arithmetic_symbol ,input_number);
      intermediate_result = null;
      saved_arithmetic_symbol = null;
      first_number = null;
    }
    display.textContent = result;
    sub_display.textContent = null;
  }else if(step_of_calculation == 2){
    if(input_number){
      intermediate_result = calculate(Number(saved_number) ,input_arithmetic_symbol ,Number(input_number));
      result = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
      input_number = null;
      input_arithmetic_symbol = null;
      saved_number = null;
      saved_arithmetic_symbol = null;
      first_number = null;
    }else if(calculation_order_check){
      input_number = saved_number;
      intermediate_result = calculate(Number(saved_number) ,input_arithmetic_symbol ,Number(input_number));
      result = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(intermediate_result));
      saved_number = null;
      saved_arithmetic_symbol = null;
      first_number = null;
    }else{
      intermediate_result = calculate(Number(first_number) ,saved_arithmetic_symbol ,Number(saved_number));
      input_number = intermediate_result;
      result = calculate(Number(intermediate_result) ,input_arithmetic_symbol ,Number(intermediate_result));
      intermediate_result = null;
      saved_number = null;
      saved_arithmetic_symbol = null;
      first_number = null;
    }
    display.textContent = result;
    sub_display.textContent = null;
  }else if(step_of_calculation == 1){
    if(input_number){
      result = calculate(Number(first_number) ,input_arithmetic_symbol ,Number(input_number));
      input_number = null;
      input_arithmetic_symbol = null;
      first_number = null;
    }else{
      input_number = first_number;
      result = calculate(Number(first_number) ,input_arithmetic_symbol ,Number(input_number));
      first_number = null;
    }
    display.textContent = String(result);
    sub_display.textContent = null;
  }
}
function allClear_click(){
  input_number = null;
  saved_number =null;
  input_arithmetic_symbol = null;
  saved_arithmetic_symbol = null;
  result = null;
  intermediate_result = null;
  calculation_order_check = false;
  step_of_calculation = 0;
  display.textContent = "0";
  sub_display.textContent = null;
  decimal_point_check = false;
}

function change_symbol(value){
  if(value == "×"){
    input_arithmetic_symbol = "*";
    return input_arithmetic_symbol;
  }else if(value == "÷"){
    input_arithmetic_symbol = "/";
    return input_arithmetic_symbol;
  }else {
    input_arithmetic_symbol = value;
    return input_arithmetic_symbol;
  }
}

function calculate(number_1,arithmetic_symbol,number_2){
  let result_in_function;
  if(arithmetic_symbol == "+"){
    result_in_function = number_1 + number_2;
    return String(result_in_function);
  }else if(arithmetic_symbol == "-"){
    result_in_function = number_1 - number_2;
    return String(result_in_function);
  }else if(arithmetic_symbol == "*"){
    result_in_function = number_1 * number_2;
    return String(result_in_function);
  }else{
    result_in_function = number_1 / number_2;
    return String(result_in_function);
  }
}
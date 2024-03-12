package in.sanjeetdutt.stacks;

import java.util.ArrayList;
import java.util.Stack;

public class EvaluateExpression {
    public int evalRPN(ArrayList<String> A) {
        Stack<Integer> integerStack = new Stack<>();

        for(String str : A){
            if( str.equals("+") ||str.equals("-") || str.equals("/") || str.equals("*")){
                integerStack = operate(integerStack, str);
            } else {
                integerStack.add(Integer.parseInt(str));
            }
        }

        return integerStack.pop();
    }

    Stack<Integer> operate(Stack<Integer> integerStack, String operator){

        Integer b = integerStack.pop();
        Integer a = integerStack.pop();
        int c;

        switch (operator){
            case "+":
                c = a+b;
                break;

            case "-":
                c = a-b;
                break;

            case "/":
                c = a/b;
                break;

            case "*":
                c = a*b;
                break;

            default:
                c = 0;
        }

        integerStack.add(c);

        return integerStack;
    }
}

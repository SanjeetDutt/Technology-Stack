package in.sanjeetdutt.stacks;

import java.util.ArrayList;
import java.util.Stack;

public class NearestSmallerElement {
    public ArrayList<Integer> prevSmaller(ArrayList<Integer> A) {

        Stack<Integer> integerStack = new Stack<>();

        ArrayList<Integer> result = new ArrayList<>();

        for(Integer value : A){
            Integer nearestSmallerElement = getNearestSmallerElement(integerStack, value);
            result.add(nearestSmallerElement);
            addValueInStack(integerStack, value);
        }

        return result;
    }

    Integer getNearestSmallerElement(Stack<Integer> integerStack, Integer value){

        for (int i = integerStack.size()-1; i>=0;i--) {
            Integer currentVal = integerStack.get(i);
            if (currentVal < value)
                return currentVal;
        }

        return -1;
    }

    void addValueInStack (Stack<Integer> integerStack, Integer value){
        while (integerStack.size() > 0 && integerStack.peek() > value){
            integerStack.pop();
        }
        integerStack.add(value);
    }
}

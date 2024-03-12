package in.sanjeetdutt.stacks;

import java.util.Stack;

/*
Given an expression string A, examine whether the pairs and the orders of “{“,”}”, ”(“,”)”, ”[“,”]” are correct in A.

Refer to the examples for more clarity.
Input 1:
 A = {([])}
 ans = 1

Input 2:
 A = (){
 ans = 0

Input 3:
 A = ()[]
 ans = 1
 */
public class BalanceParenthesis {
    public int solve(String A) {

        Stack<Character> characterStack = new Stack<>();

        for (char c :  A.toCharArray()){

            // if char are opening braces (, {, [.
            if(c == '(' || c == '{' || c == '['){
                characterStack.add(c);
            }

            // if char are closing braces ), }, ].
            if(c == ')'){
                if(characterStack.size() == 0) return 0;
                char lastChar = characterStack.pop();
                if(lastChar != '(') return 0;
            }


            if(c == '}'){
                if(characterStack.size() == 0) return 0;
                char lastChar = characterStack.pop();
                if(lastChar != '{') return 0;
            }

            if(c == ']'){
                if(characterStack.size() == 0) return 0;
                char lastChar = characterStack.pop();
                if (lastChar != '[') return 0;
            }


        }

        if(characterStack.size() == 0) return 1;

        return 0;
    }
}

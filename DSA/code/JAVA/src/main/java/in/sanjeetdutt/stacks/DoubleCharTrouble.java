package in.sanjeetdutt.stacks;

import java.util.Stack;

public class DoubleCharTrouble {
    public String solve(String A) {
        StringBuilder str = new StringBuilder();

        for(char c : A.toCharArray()){
            int answerLength = str.length();

            if(answerLength == 0){
                str.append(c);
                continue;
            }

            char lastChar = str.charAt(answerLength - 1 );

            if(c == lastChar){
                str.deleteCharAt(answerLength - 1 );
            } else {
                str.append(c);
            }
        }

        return str.toString();

    }
}

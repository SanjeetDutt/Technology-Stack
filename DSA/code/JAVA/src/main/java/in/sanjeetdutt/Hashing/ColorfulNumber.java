package in.sanjeetdutt.Hashing;
/*
Given a number A, find if it is COLORFUL number or not.

If number A is a COLORFUL number return 1 else, return 0.

What is a COLORFUL Number:

A number can be broken into different consecutive sequence of digits.
The number 3245 can be broken into sequences like 3, 2, 4, 5, 32, 24, 45, 324, 245 and 3245.
This number is a COLORFUL number, since the product of every consecutive sequence of digits is different
 */

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class ColorfulNumber {

    public int colorful(int A) {
        ArrayList<Integer> inputArray = new ArrayList<>();
        Set<Long> productSet = new HashSet<>();

        while (A > 0){
            int last = A%10;
            inputArray.add(last);
            A = A/10;
        }

        for(int windowSize = 1; windowSize <= inputArray.size(); windowSize++ ){
            long product = 1;

            //Initiating the window
            for (int i = 0 ; i <windowSize; i++){
                product = product * inputArray.get(i);
            }

            if(productSet.contains(product)) return 0;
            else productSet.add(product);

            for(int i = windowSize; i < inputArray.size() ; i++){
                int numberToRemove = inputArray.get(i - windowSize);

                if(numberToRemove == 0) return 0;

                product = product / numberToRemove;
                product = product * inputArray.get(i);

                if(productSet.contains(product))
                    return 0;

                productSet.add(product);

            }
        }

        return 1;
    }

}

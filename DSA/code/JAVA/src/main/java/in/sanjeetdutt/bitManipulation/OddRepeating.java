package in.sanjeetdutt.bitManipulation;


// Given an array of int and all element are repeating thrice except 1. Find the unique element
public class OddRepeating {

    int solve(int[] array){
        int ans = 0;

        for(int i = 0; i < 32; i++){

            int count = 0;
            for(int number : array){
                count += (number >> i) & 1;//if bit is set, increment the count
            }

            if(count%3 != 0){
                ans = ans + (1 << i);
            }
        }

        return ans;
    }
}

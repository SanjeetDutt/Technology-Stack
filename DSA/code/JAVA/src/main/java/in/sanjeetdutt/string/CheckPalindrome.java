package in.sanjeetdutt.string;

public class CheckPalindrome {

    boolean check(String str){
        int start = 0;
        int end = str.length()-1;

        while (start<end){
            if(str.charAt(start) != str.charAt(end))
                return false;

            start++;
            end--;
        }

        return true;
    }
}

// Solving with 2 pointer approach

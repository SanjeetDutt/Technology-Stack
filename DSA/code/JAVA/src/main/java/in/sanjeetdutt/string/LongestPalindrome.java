package in.sanjeetdutt.string;

public class LongestPalindrome {
    int findLength(String str){
        int length = 0;

        for (int i = 0; i < str.length(); i++) {
            int l1 = getLongestPalindrome(str, i, i);
            int l2 = getLongestPalindrome(str, i, i+1);

            if(length < l1)
                length = l1;

            if(length < l2)
                length = l2;
        }

        return length;
    }

    int getLongestPalindrome(String str, int p1, int p2){
        if (str.length() == 1)
            return 1;

        while (p1 >= 0 && p2<str.length()){
            if(str.charAt(p1) != str.charAt(p2)){
                break;
            }
            p1--;
            p2++;
        }

        return p2-p1-1;

    }
}

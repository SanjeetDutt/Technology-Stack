package in.sanjeetdutt.string;

// Given string the toggle each chars
public class ToggleChar {

    String toggle(String str){

        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < str.length(); i++) {

            char c = str.charAt(i);

            if(c>='a' && c<='z'){
                // change small to large
                stringBuilder.append((char) ('A' + (c - 'a')));
            }

            if(c>='A' && c<='Z'){
                // Change large to small
                stringBuilder.append((char) ('a' + (c - 'A')));
            }

        }
        return stringBuilder.toString();
    }
}

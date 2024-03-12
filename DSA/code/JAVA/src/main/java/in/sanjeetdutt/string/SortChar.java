package in.sanjeetdutt.string;

// Given String of lower char sort each char
public class SortChar {

    String sort(String str){
        int[] charMap = new int[27];

        for(char c : str.toCharArray()){
            int index = c-'a';
            charMap[index]++;
        }

        StringBuilder stringBuilder = new StringBuilder();

        for(int i = 0 ; i < charMap.length; i++){
            int count = charMap[i];

            for (int j = 0; j < count; j++){
                stringBuilder.append((char)('a'+i));
            }
        }

        return stringBuilder.toString();
    }
}

// THis is also known as Radix sorting

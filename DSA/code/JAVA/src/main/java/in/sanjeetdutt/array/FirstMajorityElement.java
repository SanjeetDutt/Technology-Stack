package in.sanjeetdutt.array;

public class FirstMajorityElement {

    int findMajorityElement(int[] array){

        int element = array[0];
        int count = 1;


        for(int i = 1; i < array.length; i++){

            if(array[i] == element)
                count++;
            else{
                if(count == 0){
                    count = 1;
                    element = array[i];
                } else {
                    count--;
                }
            }

        }

        count = 0;
        for (int i = 0; i < array.length ; i++) {
            if(array[i] == element)
                count++;
        }

        if(count >= array.length/2)
            return element;

        return -1;

    }


}

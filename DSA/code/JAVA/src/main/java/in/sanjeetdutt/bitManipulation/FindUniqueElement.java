package in.sanjeetdutt.bitManipulation;

public class FindUniqueElement {

    int find (int[] A){

        int no = 0;

        for(int i : A){
            no = no ^ i;
        }

        return no;
    }

}

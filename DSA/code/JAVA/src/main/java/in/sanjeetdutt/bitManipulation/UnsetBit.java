package in.sanjeetdutt.bitManipulation;

// Unset the ith bit

public class UnsetBit {

    int unset(int A, int i){

        // Check if ith bit is set or not, if so unset

        if( (A & (1 << i)) > 0){
            A = A ^ (1 << i);
        }

        return A;

    }
}

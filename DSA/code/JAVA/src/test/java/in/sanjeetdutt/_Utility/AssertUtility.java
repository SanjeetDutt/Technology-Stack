package in.sanjeetdutt._Utility;

public class AssertUtility {

    public static <type> boolean IsAny(type item, type[] array){

        for(type t : array){
            if(t == item) return true;
        }

        return false;
    }
}

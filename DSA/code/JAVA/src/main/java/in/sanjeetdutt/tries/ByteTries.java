package in.sanjeetdutt.tries;

public class ByteTries {
    ByteTriNode root;

    public ByteTries() {
        this.root = new ByteTriNode(0);
    }

    void insert(int number, int bitCount){
        ByteTriNode currentNode = root;
        for (int i = bitCount-1; i>= 0; i--){
            boolean currentBitSet = (number & (1 << i)) != 0;

            if(currentBitSet){
                if(currentNode.children[1] == null)
                    currentNode.children[1] = new ByteTriNode(1);

                currentNode = currentNode.children[1];
            } else {
                if(currentNode.children[0] == null)
                    currentNode.children[0] = new ByteTriNode(0);

                currentNode = currentNode.children[0];
            }
        }
    }

    int maxXOR (int[] array){

        // find max value in array
        int max = array[0];
        for(int i : array){
            if(i > max) max = i;
        }

        // Find the max value bitLength
        int bitCount = 0;
        while (max > 0){
            max = max >> 1;
            bitCount++;
        }


        for(int i : array){
            this.insert(i, bitCount);
        }

        return 0;
    }

}

class ByteTriNode {
    int data;
    ByteTriNode[] children;

    public ByteTriNode(int data) {
        this.data = data;
        this.children = new ByteTriNode[2];
    }
}


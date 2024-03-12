package in.sanjeetdutt.tree;

public class MorrisInorderTraversal {

    void print(IterativeTraverse.Node rootNode){
        IterativeTraverse.Node currentPointer = rootNode;

        while (currentPointer != null){

            if(currentPointer.leftNode == null){
                System.out.println(currentPointer.value);
                currentPointer = currentPointer.rightNode;
            } else {
                IterativeTraverse.Node rightMostChild = currentPointer.leftNode;

                while (rightMostChild.rightNode != null && rightMostChild.rightNode != currentPointer){
                    rightMostChild = rightMostChild.rightNode;
                }

                if(rightMostChild.rightNode == null){
                    rightMostChild.rightNode = currentPointer;
                    currentPointer = currentPointer.leftNode;
                }

                if(rightMostChild.rightNode == currentPointer){
                    rightMostChild.rightNode = null;
                    System.out.println(currentPointer.value);
                    currentPointer = currentPointer.rightNode;
                }
            }
        }
    }

}

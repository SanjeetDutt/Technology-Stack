package in.sanjeetdutt.tries;

import java.util.Arrays;
import java.util.Objects;

public class Tries {
    TriesNode root;

    public Tries() {
        this.root = new TriesNode('0');
    }

    // Time complexity = O(length of word)
    // Space complexity = O(length of word)
    void insert(String word){
        TriesNode currentNode = root;

        for(int i = 0; i < word.length(); i++){
            int charIndex = word.charAt(i) - 'a';

            if(currentNode.children[charIndex] == null){
                currentNode.children[charIndex] = new TriesNode(word.charAt(i));
            }

            currentNode = currentNode.children[charIndex];
        }
    }

    // Time complexity = O(length of word)
    // Space complexity = O(1)
    boolean search (String word){
        TriesNode currentNode = root;

        for(int i = 0 ; i < word.length(); i++){
            int charIndex = word.charAt(i) - 'a';

            if(currentNode.children[charIndex] == null){
                return false;
            }

            currentNode = currentNode.children[charIndex];
        }

        return true;
    }

    // For deleting a word from trie we will delete the whole branch which will become orphan after the deleted
    // EX: We have 2 word ; Try and Trimmer and want to delete trim, se we will disconnect i from r for better coding
    // So for that we must have a pointer at 'r' and another pointer indicating 'i' indicating disconnection
    // let
    //      currentPointer = indicating the current node of evaluation
    //      lastValidNode = last node from where branch is disconnecting
    //      disconnectingNodeIdx = node from where branch will be disconnected
    void delete (String word){
        TriesNode currentNode = root;
        TriesNode lastValidNode = root;
        char disconnectingWord = 0;

        for(int i = 0 ; i < word.length(); i++){

            char letter = word.charAt(i);
            int letterIdx = letter - 'a';
            currentNode = currentNode.children[letterIdx];

            // Counting total words that are forming from this node
            int count = (int) Arrays.stream(currentNode.children).filter(Objects::nonNull).count();

            // Current node can be used for creating more than one word
            // Current node is an end of a word
            if(count > 1 || currentNode.eow){
                lastValidNode = currentNode;
                // My next word for disconnection (I)
                if(i+1 < word.length()){
                    disconnectingWord = word.charAt(i+1);
                } else {
                    disconnectingWord = 0;
                }
            }
        }

        if(lastValidNode != root && disconnectingWord != 0){
            lastValidNode.children[disconnectingWord - 'a'] = null;
        }
    }
}

class TriesNode{
    char data;
    TriesNode[] children;
    boolean eow; // end of word

    public TriesNode(char data) {
        this.data = data;
        this.children = new TriesNode[26];
        this.eow = false;
    }
}

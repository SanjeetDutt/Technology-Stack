package in.sanjeetdutt.stacks;

import java.util.ArrayList;
import java.util.Stack;

/*
Problem Description
Given an array of integers A.

A represents a histogram i.e A[i] denotes the height of the ith histogram's bar. Width of each bar is 1.

Find the area of the largest rectangle formed by the histogram.

Example
 A = [2, 1, 5, 6, 2, 3]
 Ans = 10
 The largest rectangle has area = 10 unit. Formed by A[3] to A[4].
 */

public class LargestRectangle {
    public int largestRectangleArea(int[] A) {
        //APPROACH USED IS THAT WE FOR EACH INDEX WE NEED TO FIND THE HEIGHT JUST SMALLER THAN A[i] AT BOTH LEFT AND RIGHT
        int[] left =new int[A.length];
        int[] right =new int[A.length];

        //INITIALISE ALL THE LEFT WITH -1 AND RIGHT WITH A.LENGTH
        for(int i=0;i<A.length;i++){
            left[i]=-1;
            right[i]=A.length;
        }

        //FIND JUST SMALLER ELEMENT INDEX IN FOR EACH ELEMENT OF A
        Stack<Integer> stk1=new Stack<>();

        //DO FOR LEFT ARRAY
        for(int i=0;i<A.length;i++){
            while(stk1.size()>0 && A[stk1.peek()]>=A[i]){
                stk1.pop();
            }
            if(stk1.size()>0){
                left[i]=stk1.peek();
            }
            stk1.push(i);
        }
        //DO FOR RIGHT ARRAY
        Stack<Integer> stk2=new Stack<>();
        for(int i=A.length-1;i>=0;i--){
            while(stk2.size()>0 && A[stk2.peek()]>=A[i]){
                stk2.pop();
            }
            if(stk2.size()>0){
                right[i]=stk2.peek();
            }
            stk2.push(i);
        }
        // RIGHT AND LEFT ARRAYS ARE DONE

        //NOW JUST TRAVERSE THE ARRAY A AND FOR EACH INDEX CALCULATE THE AREA
        int ans=Integer.MIN_VALUE;
        for(int i=0;i<A.length;i++){
            int p1=left[i];
            int p2=right[i];
            int area=A[i]*(p2-p1-1);
            ans=Math.max(ans,area);
        }
        return ans;

    }
}

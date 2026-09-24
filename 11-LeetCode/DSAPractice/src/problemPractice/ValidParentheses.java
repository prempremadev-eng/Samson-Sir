package problemPractice;

import java.util.Stack;

public class ValidParentheses {
	public static void main(String[] args) {
		
		ValidParentheses vp = new ValidParentheses();
		 String s = "((()))";
		boolean result = vp.stackApproch(s);
	
	}
	
	
	
	
	private boolean stackApproch(String s) {
		
		//"((())"
		        Stack<Character> stack = new Stack<>();
		        for (char ch : s.toCharArray()) 
		        {
		            if (ch == '(' || ch == '[' || ch == '{') 
		            {
		                stack.push(ch);
		                System.out.println(ch);
		            }
		            else 
		            {
		                if (stack.isEmpty())
		                {
		                    return false;
		                }
		                
		                char top = stack.pop();
		                System.out.println(top);
		                
		                if (ch == ')' && top != '(') {
		                    return false;
		                }
		                if (ch == ']' && top != '[') {
		                    return false;
		                }
		                if (ch == '}' && top != '{') {
		                    return false;
		                }
		            }
		        }
		         boolean  answer = stack.isEmpty();
		         System.out.println(answer);
		         return answer;
		    }
				
	}



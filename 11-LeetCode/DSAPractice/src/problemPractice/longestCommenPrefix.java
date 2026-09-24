package problemPractice;

public class longestCommenPrefix {
	public static void main(String[] args) {
	
		
		longestCommenPrefix lcp = new longestCommenPrefix();
		String strs [] = {"flower","flow", "flight"};
		String result = lcp.startWidthApproch(strs);
		System.out.println(result);
		
	}

		    public String startWidthApproch(String[] strs) {
		    	

		        // Step 1: Take the first string as prefix
		        String prefix = strs[0];

		        // Step 2: Check remaining strings one by one
		        for (int i = 1; i < strs.length; i++) {

		            // Step 3: If current word does not start with prefix
		            while (!strs[i].startsWith(prefix)) {

		                // Step 4: Remove the last character
		                prefix = prefix.substring(0, prefix.length() - 1);

		                // Step 5: If prefix becomes empty, return ""
		                if (prefix.isEmpty()) {
		                    return "";
		                }
		            }
		        }

		        // Step 6: Return the final common prefix
		        return prefix;
		
		    }
}

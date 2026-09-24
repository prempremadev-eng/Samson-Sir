package problemPractice;

public class RemoveDuplicate {
	public static void main(String[] args) {
		RemoveDuplicate rm = new RemoveDuplicate();
		int []arr = {0,1,1,2,2,3,3};
		rm.twoPointerMethod(arr);
	}

	private void twoPointerMethod(int[] arr) {
		int s=0, c=1;
		
		for(c=1; c<arr.length;c++)
		{
			if(arr[s] != arr[c])
			{
				s++;
				arr[s] = arr[c];
			}
		}
		System.out.println(++s);
	}

}

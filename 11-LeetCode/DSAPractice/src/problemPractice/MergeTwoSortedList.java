package problemPractice;

public class MergeTwoSortedList {

    static class ListNode {

        int val;
        ListNode next;

        ListNode(int val) {
            this.val = val;
            this.next = null;
        }
    }

    public static void main(String[] args) {

        MergeTwoSortedList mtl = new MergeTwoSortedList();

        // List 1: 1 → 2 → 4
        ListNode list1 = new ListNode(1);
        list1.next = new ListNode(2);
        list1.next.next = new ListNode(4);

        // List 2: 1 → 3 → 4
        ListNode list2 = new ListNode(1);
        list2.next = new ListNode(3);
        list2.next.next = new ListNode(4);

        // Merge both lists
        ListNode result = mtl.fistVersion(list1, list2);

        // Print the merged list
        while (result != null) {
            System.out.print(result.val + " ");
            result = result.next;
        }
    }

    private ListNode fistVersion(ListNode list1, ListNode list2) {

        // Temporary starting node
        ListNode dummy = new ListNode(0);

        // current starts from dummy
        ListNode current = dummy;

        while (list1 != null && list2 != null) {

            if (list1.val <= list2.val) {

                current.next = list1;

                list1 = list1.next;

            } else {

                current.next = list2;

                list2 = list2.next;
            }

            current = current.next;
        }

        // One list is finished.
        // Add the remaining list.
        if (list1 != null) {

            current.next = list1;

        } else {

            current.next = list2;
        }

        // Don't return dummy (0).
        // Return the actual first node.
        return dummy.next;
    }
}
import Tree from "./Tree.js";
/**
 * Write a driver script that does the following:
 * 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
 * 2. Confirm that the tree is balanced by calling isBalanced.
 * 3. Print out all elements in level, pre, post, and in order
 * 4. Unbalance the tree by adding several numbers > 100.
 * 5. Confirm that the tree is unbalanced by calling isBalanced
 * 6. Balance the tree by calling rebalance.
 * 7. Confirm that the tree is balanced by calling isBalanced.
 * 8.Print out all elements in level, pre, post, and in order.
 *
 */

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
const array = generateRandom(100);
const binaryTree = new Tree(array);

// 2. Confirm that the tree is balanced by calling isBalanced.
console.log("Is tree balanced?", binaryTree.isBalanced());

//binaryTree.prettyPrint();

// 3. Print out all elements in leve, pre, post, and in order.

// Print the tree in level-order
console.log("Level-order:");
console.log(binaryTree.levelOrder());

// Print the tree in pre-order
console.log("Pre-order:");
console.log(binaryTree.preOrder());

// Print the tree in post-order
console.log("Post-order:");
console.log(binaryTree.postOrder());

// Print the tree in in-order
console.log("In-order:");
console.log(binaryTree.inOrder());

// 4. Unbalance the tree by adding several numbers >  100.

// insert 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
binaryTree.insert(5);
binaryTree.insert(10);
binaryTree.insert(15);
binaryTree.insert(20);
binaryTree.insert(25);
binaryTree.insert(30);
binaryTree.insert(35);
binaryTree.insert(40);
binaryTree.insert(45);
binaryTree.insert(50);
binaryTree.insert(1);
binaryTree.insert(2);
binaryTree.insert(3);
binaryTree.insert(4);
binaryTree.insert(5);
binaryTree.insert(6);
binaryTree.insert(7);
binaryTree.insert(8);

// 5. Confirm that the tree is unbalanced by calling isBalanced.

console.log("Is the tree balanced?", binaryTree.isBalanced());

// 6. Balance the tree by calling rebalance.
console.log("Balancing the tree...");
binaryTree.rebalance();
// 7. Confirm that the tree is unbalanced by calling isBalanced.
console.log("Is the tree balanced?", binaryTree.isBalanced());

// 8. Print out all elements in level, pre, post, and in order.
// Print the tree in level-order
console.log("Level-order:");
console.log(binaryTree.levelOrder());

// Print the tree in pre-order
console.log("Pre-order:");
console.log(binaryTree.preOrder());

// Print the tree in post-order
console.log("Post-order:");
console.log(binaryTree.postOrder());

// Print the tree in in-order
console.log("In-order:");
console.log(binaryTree.inOrder());

/**
 * Generates an array of random numbers.
 * @param {number} size - The size of the array to generate.
 * @returns {number[]} - An array of random numbers.
 */
function generateRandom(size) {
  const randomArray = [];
  for (let i = 0; i < size; i++) {
    // Generate a random number between 0 and 100
    const randomNum = Math.floor(Math.random() * 101);
    randomArray.push(randomNum);
  }
  return randomArray;
}

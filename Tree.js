import Node from "./Node.js";

/**
 * A balanced binary search tree
 */

export default class Tree {
  constructor(array) {
    this.array = this.removeDuplicates(array.sort((a, b) => a - b)); // sorts and removes duplicates of the array just in case.
    this.root = this.buildTree(this.array);
  }
  /**
   * Takes an array of data and turns it into a balanced binary tree full of Node objects. Before the tree is built, the array is sorted and duplicates are removed.
   * @param {array} array
   * @param {number} start - starting index of subarray.
   * @param {number} end - ending index of subarray.
   * @returns {Node} - level 0 root node.
   */
  buildTree(array, start = 0, end = array.length - 1) {
    // 1. Initialize base case
    if (start > end) return null;

    // 2. initialize mid
    let mid = Math.floor((start + end) / 2); // ensure mid is an integer.

    // 3. Create a tree with mid as root
    let rootNode = new Node(array[mid]);

    // 4. Recurisively do the following steps:

    // 5. Calculate mid of left subarray and make it root of left subtree of A
    rootNode.left = this.buildTree(array, start, mid - 1);
    rootNode.right = this.buildTree(array, mid + 1, end);
    // 6. Calculate mid of right subarray and make it root of right subtree of A.

    return rootNode;
  }
  /**
   * accepts an array and removes the duplicates.
   * @returns {array} - duplicates removed array.
   */
  removeDuplicates(array) {
    let duplicatesRemoved = [...new Set(array)]; // The spread operator ... converts the Set back into an array.
    return duplicatesRemoved;
  }
  /**
   * Inserts a value as a leaf to the tree only.
   * @param {number} value
   * @param {Node} root - The current root node (default is tree's root)
   * @returns {Node} root
   */
  insert(value, root = this.root) {
    // check if tree is empty, return a new node.
    if (root === null) {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
      }
      return newNode;
    }
    // Compare the value to be inserted with the value of the current node.
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  deleteItem(value, root = this.root) {
    // There are three different scenarios.
    /*
        Case 1: delete a leaf node
        Case 2: Delete a node with a single child - Copy the child to the node and delete the node. 
        Case 3: Delete a node with both children - Not so simple
            1. Find the Node that is just bigger than itself by doing the following: 
                i. move to the right node once, then move all the way to the left until left = null. That means it's the smallest thing in the subtree. 
            2. Swap the two nodes. 
            3. Then delete the node utilizing Case 2, since it only has one child. 
        */

    // If the tree is empty, return null. Base Case.
    if (root === null) {
      return null;
    }

    // If the value to be deleted is smaller than the roots value, then it lies in the left subtree.
    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    }
    // If the value to be deleted is greater than the root's value, then it lies in the right subtree.
    else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    }
    //If the value to be deleted is the same as the root's value, then this is the node to be deleted.
    else {
      // Node with only one child or no child.
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Node with two children: get the inorder successor (smallest value in the right subtree.)
      root.data = this.minValue(root.right);

      // Delete the inorder successor
      root.right = this.deleteItem(root.data, root.right);
    }
    return root;
  }

  minValue(node) {
    let minV = node.data;
    while (node.left !== null) {
      minV = node.left.data;
      node = node.left;
    }
    return minV;
  }
  /**
   * Returns the node with the given value.
   * @param {number} value
   * @returns {Node|null} -  The node with the given value, or null if not found.
   */
  find(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      // if value is less than current Node go left.
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      }
      // if value is greater than current node go right.
      else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        console.log("Value found.");
        return currentNode;
      }
    }
    // value not found
    console.log("The value was not found. ");
    return null;
  }

  // Write a levelOrder(callback) function that accepts an optional callback function as its parameter. It should traverse the tree in breadth-first level order and provide each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. The method should return an array of values if no callback is given as an argument.

  levelOrder(callback) {
    if (this.root === null) return [];

    let result = []; //  initialize return array.
    let queue = [this.root]; // initialize our queue.

    // while there is at least one discovered node
    while (queue.length > 0) {
      // assign currentNode to the node at the front of queue.
      let currentNode = queue.shift();

      // deal with callback
      if (callback) {
        callback(currentNode.data);
      } else {
        result.push(currentNode.data);
      }

      // if the current node has a left element add it to queue.
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    if (!callback) {
      return result;
    }
  }

  preOrder(callback) {
    if (this.root === null) return [];

    // Initialize the result array if no callback is provided
    const result = callback ? null : [];
    //Helper function to perform the pre-order traversal recursively.

    function traverse(node, callback, result) {
      //Base case
      if (node === null) return;
      // If callback is provided, execute it on the current node.
      if (callback) {
        callback(node.data);
      }
      // else add the node's data to the result array. Visited.
      else {
        result.push(node.data);
      }

      // Recursivly traverse the left and right subtrees.
      // Start with left
      traverse(node.left, callback, result);
      traverse(node.right, callback, result);
    }

    // start the traversal from the root.
    traverse(this.root, callback, result);
    // Return the result array if no callback is provided.
    return result;
  }

  /**
   * Traverses the tree in in-order (left, root, right) and provides each node as an argument to the callback.
   * If no callback is provided, returns an array of node values in in-order.
   * @param {function} [callback] - An optional callback function.
   * @returns {array} - An array of node values if no callback is provided.
   */
  inOrder(callback) {
    if (this.root === null) return [];

    // Initialize the result array if no callback is provided
    const result = callback ? null : [];

    // Helper function to perform the in-order traversal recursively
    function traverse(node, callback, result) {
      // Base case: if the node is null, return
      if (node === null) return;

      // Recursively traverse the left subtree
      traverse(node.left, callback, result);

      // If callback is provided, execute it on the current node
      if (callback) {
        callback(node.data);
      } else {
        // Otherwise, add the node's data to the result array
        result.push(node.data);
      }

      // Recursively traverse the right subtree
      traverse(node.right, callback, result);
    }

    // Start the traversal from the root
    traverse(this.root, callback, result);

    // Return the result array if no callback is provided
    return result;
  }

  /**
   * Traverses the tree in post-order (left, right, root) and provides each node as an argument to the callback.
   * If no callback is provided, returns an array of node values in post-order.
   * @param {function} [callback] - An optional callback function.
   * @returns {array} - An array of node values if no callback is provided.
   */
  postOrder(callback) {
    if (this.root === null) return [];

    // Initialize the result array if no callback is provided
    const result = callback ? null : [];

    // Helper function to perform the post-order traversal recursively
    function traverse(node, callback, result) {
      // Base case: if the node is null, return
      if (node === null) return;

      // Recursively traverse the left subtree
      traverse(node.left, callback, result);

      // Recursively traverse the right subtree
      traverse(node.right, callback, result);

      // If callback is provided, execute it on the current node
      if (callback) {
        callback(node.data);
      } else {
        // Otherwise, add the node's data to the result array
        result.push(node.data);
      }
    }

    // Start the traversal from the root
    traverse(this.root, callback, result);

    // Return the result array if no callback is provided
    return result;
  }

  /**
   * Returns the height of the given node.
   * Height is defined as the number of edges in the longest path from the given node.
   * @param {Node} node - The node whose height is to be calculated.
   * @returns {number} - The height of the node.
   */
  height(node) {
    // Implement Base case: if node is 'null' it's height is -1 (since there are no edges).
    if (node === null) {
      return -1;
    }

    // Recursively calculate the height of the left child.
    const leftHeight = this.height(node.left);
    // do the same with the right.
    const rightHeight = this.height(node.right);

    // The height of the current node is 1 plus the max height of it's children.
    return 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * Returns the given node's depth. Depth is defined as the number of edges in the path from a given node to the tree's root node.
   * @param {*} node - node given.
   * @returns {number} - depth of the node. if -1 is returned, the node was not found.
   */
  depth(node) {
    // define the base case
    if (node === null) {
      return -1;
    }
    // initialize the depth counter to keep track of number of edges.
    let counter = 0;

    // traverse from root down to the given node, counting how many steps it takes.
    let current = this.root;
    while (current !== null) {
      if (current.data === node.data) {
        return counter;
      } else if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      counter++;
    }

    // if we exit the while loop it means the node was not found.
    return -1;
  }

  /**
   * Checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and right subtree of ever node is not more than 1. If no parameter is added, then the function will determine if the entire tree is balanced.
   * @param {Node} - Node to check for balance.
   * @returns {boolean} - either true or false.
   */
  isBalanced(node = this.root) {
    // base case: if node is null it's return
    if (node === null) {
      return true;
    }

    // get the height of the left and right subtrees
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    // check if the current node is balanced
    const isCurrentNodeBalanced = Math.abs(leftHeight - rightHeight) <= 1;

    // recursively check if the left and right subtrees are balanced.
    const isLeftSubtreeBalanaced = this.isBalanced(node.left);
    const isRightSubtreeBalanced = this.isBalanced(node.right);

    return (
      isCurrentNodeBalanced && isLeftSubtreeBalanaced && isRightSubtreeBalanced
    );
  }

  /**
   * Rebalances an unbalanced tree.
   */
  rebalance() {
    // Get the in-order traversal of the tree, which is a sorted array of values
    const sortedArray = this.inOrder();

    // Rebuild the tree using the sorted array
    this.root = this.buildTree(sortedArray);
  }

  /**
   * Pretty prints the binary tree.
   * @param {Node} node - The root node of the tree.
   * @param {string} prefix - The prefix for the current node's level.
   * @param {boolean} isLeft - Indicates if the node is a left child.
   */
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

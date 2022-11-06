export default class Heap {
  constructor() {
    this.heap = [];
  }

  getMin() {
    return this.heap[0];
  }

  insert(node, c1, c2 = c1) {
    this.heap.push(node);
    let i = this.heap.length - 1;

    while (i > 0) {
      let current = this.heap[i];
      let parent = this.heap[Math.floor((i - 1) / 2)];

      if (current?.[c1] < parent?.[c1]) {
        [this.heap[Math.floor((i - 1) / 2)], this.heap[i]] = [
          this.heap[i],
          this.heap[Math.floor((i - 1) / 2)],
        ];
        i = Math.floor((i - 1) / 2);
      } else if (current?.[c1] === parent?.[c1]) {
        if (current?.[c2] < parent?.[c2]) {
          [this.heap[Math.floor((i - 1) / 2)], this.heap[i]] = [
            this.heap[i],
            this.heap[Math.floor((i - 1) / 2)],
          ];
          i = Math.floor((i - 1) / 2);
        } else break;
      } else break;
    }
  }

  shift(c1, c2 = c1) {
    const minValue = this.heap.shift();
    if (this.heap.length === 0) return minValue;

    this.heap.unshift(this.heap.pop());

    let i = 0;
    let currentNode = this.heap[i];
    let leftChild = this.getLeftChild(i);
    let rightChild = this.getRightChild(i);

    while (i < this.heap.length - 1) {
      if (
        leftChild?.[c1] <= currentNode?.[c1] ||
        rightChild?.[c1] <= currentNode?.[c1]
      ) {
        if (leftChild?.[c1] < rightChild?.[c1]) {
          [this.heap[this.getLeft(i)], this.heap[i]] = [
            this.heap[i],
            this.heap[this.getLeft(i)],
          ];
          i = this.getLeft(i);
          leftChild = this.getLeftChild(i);
          rightChild = this.getRightChild(i);
        } else if (rightChild?.[c1] < leftChild?.[c1]) {
          [this.heap[this.getRight(i)], this.heap[i]] = [
            this.heap[i],
            this.heap[this.getRight(i)],
          ];
          i = this.getRight(i);
          leftChild = this.getLeftChild(i);
          rightChild = this.getRightChild(i);
        } else if (leftChild?.[c1] === rightChild?.[c1]) {
          if (leftChild?.[c2] <= rightChild?.[c2]) {
            [this.heap[this.getLeft(i)], this.heap[i]] = [
              this.heap[i],
              this.heap[this.getLeft(i)],
            ];
            i = this.getLeft(i);
            leftChild = this.getLeftChild(i);
            rightChild = this.getRightChild(i);
          } else if (rightChild?.[c2] < leftChild?.[c2]) {
            [this.heap[this.getRight(i)], this.heap[i]] = [
              this.heap[i],
              this.heap[this.getRight(i)],
            ];
            i = this.getRight(i);
            leftChild = this.getLeftChild(i);
            rightChild = this.getRightChild(i);
          } else break;
        } else break;
      } else break;
    }
    return minValue;
  }

  getNodeIndex(x, y) {
    if (this.heap.length < 1) return -1;

    return this.heap.findIndex(node => node.x === x && node.y === y);
  }

  getLeftChild(i) {
    return this.heap[this.getLeft(i)];
  }

  getRightChild(i) {
    return this.heap[this.getRight(i)];
  }

  getLeft(i) {
    return 2 * i + 1;
  }

  getRight(i) {
    return 2 * i + 2;
  }

  getHeap() {
    return this.heap;
  }

  getHeapLength() {
    return this.heap.length;
  }

  setValue(value) {
    this.value = value;
  }
}

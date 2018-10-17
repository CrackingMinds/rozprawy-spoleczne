export class Queue<T> implements Iterable<T>{
  private _items: T[] = [];
  private currentIndex: number = 0;

  enqueue(value: T): void {
    this._items.push(value);
  }

  dequeue(): T | undefined {
    return this._items.shift();
  }

  peek(): T | undefined {
    return this._items[0];
  }

  remove(value: T): void {
    let index = this._items.indexOf(value);

    if (index !== -1) {
      this._items.splice(index, 1);
    }
  }

  [Symbol.iterator](): Iterator<T> {
    return {
      next: () => {
        let value = this._items[this.currentIndex];
        if (value) {
          this.currentIndex++;
          return {
            done: false,
            value: value
          };
        } else {
          this.currentIndex = 0;
          return {
            done: true,
            value: null
          };
        }
      }
    };
  }

}

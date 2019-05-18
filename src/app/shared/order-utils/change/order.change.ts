export type OrderChange = {
  itemId: string,
  nextId: string
};

export class OrderChanges {

  get length(): number {
    return this.changes.length;
  }

  constructor(public readonly changes: Array<OrderChange>) {}

  getItemChange(itemId: string): OrderChange {
    const result = this.changes.filter((change: OrderChange) => change.itemId === itemId);
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

}

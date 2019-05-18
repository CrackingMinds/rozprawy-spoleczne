import { Ordered } from 'app/shared/order-utils/ordered';

export class OrderedItemsSorter {

  static sort(items: Array<Ordered>): Array<Ordered> {

    const result: Array<Ordered> = [];

    const firstInOrder: Ordered = OrderedItemsSorter.findFirstItemInOrder(items);
    result.push(firstInOrder);

    let previousItem: Ordered = OrderedItemsSorter.findPreviousItemInOrder(firstInOrder.id, items);

    while (previousItem) {
      result.push(previousItem);
      previousItem = OrderedItemsSorter.findPreviousItemInOrder(previousItem.id, items);
    }

    return result;
  }

  private static findFirstItemInOrder(items: Array<Ordered>): Ordered {
    const result = items.filter((item: Ordered) => item.nextId === null);
    if (!result.length)
      throw new Error('No first item in order');

    return result[0];
  }

  private static findPreviousItemInOrder(itemId: string, items: Array<Ordered>): Ordered {
    const result = items.filter((item: Ordered) => item.nextId === itemId);
    if (!result.length)
      return null;

    return result[0];
  }

}

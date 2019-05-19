import { OrderedWithId } from 'app/shared/order-utils/ordered';

export class OrderedItemsSorter {

  static sort<T extends OrderedWithId>(items: Array<T>): Array<T> {

    if (!items.length)
      return [];

    const result: Array<T> = [];

    const firstInOrder: T = OrderedItemsSorter.findFirstItemInOrder(items);
    result.push(firstInOrder);

    let previousItem: T = OrderedItemsSorter.findPreviousItemInOrder(firstInOrder.id, items);

    while (previousItem) {
      result.push(previousItem);
      previousItem = OrderedItemsSorter.findPreviousItemInOrder(previousItem.id, items);
    }

    return result;
  }

  private static findFirstItemInOrder<T extends OrderedWithId>(items: Array<T>): T {
    const result = items.filter((item: T) => item.nextId === null);
    if (!result.length)
      throw new Error('No first item in order');

    return result[0];
  }

  private static findPreviousItemInOrder<T extends OrderedWithId>(itemId: string, items: Array<T>): T {
    const result = items.filter((item: T) => item.nextId === itemId);
    if (!result.length)
      return null;

    return result[0];
  }

}

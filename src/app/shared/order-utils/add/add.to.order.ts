import { OrderedWithId } from 'app/shared/order-utils/ordered';
import { OrderedItemsSorter } from 'app/shared/order-utils/sort/ordered.items.sorter';

export function getNextIdForNewItem(items: Array<OrderedWithId>): string {

  if (!items)
    throw new Error('Initial order is not provided');

  if (!items.length)
    throw new Error('Initial order is empty');

  const sortedItems = OrderedItemsSorter.sort(items);

  return sortedItems[sortedItems.length - 1].id;

}

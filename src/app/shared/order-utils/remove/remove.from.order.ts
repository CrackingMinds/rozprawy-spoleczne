import { findItemInOrder, findItemsPrevious } from 'app/shared/order-utils/order.utils';

import { OrderedWithId } from 'app/shared/order-utils/ordered';
import { OrderChange, OrderChanges } from 'app/shared/order-utils/change/order.change';

export function removeFromOrder(items: Array<OrderedWithId>, idOfItemToRemove: string): OrderChanges {

  const changes: Array<OrderChange> = [];

  if (!items)
    throw new Error('Initial order is not provided');

  if (!items.length)
    throw new Error('Initial order is empty');

  const currentItem = findItemInOrder(items, idOfItemToRemove);
  if (!currentItem)
    throw new Error('Current item does not exist');

  const previousOfCurrent = findItemsPrevious(items, currentItem.id);
  if (previousOfCurrent) {
    changes.push({ itemId: previousOfCurrent.id, nextId: currentItem.nextId });
  }

  return new OrderChanges(changes);

}

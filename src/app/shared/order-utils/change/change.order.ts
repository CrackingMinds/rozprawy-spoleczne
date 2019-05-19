import { findItemInOrder, findItemsPrevious } from 'app/shared/order-utils/order.utils';

import { OrderChange, OrderChanges } from 'app/shared/order-utils/change/order.change';
import { OrderedWithId } from 'app/shared/order-utils/ordered';

export function calcOrderChange(items: Array<OrderedWithId>, currentId: string, nextTargetId: string): OrderChanges {

  if (!items)
    throw new Error('Initial order is not provided');

  if (!items.length)
    throw new Error('Initial order is empty');

  if (currentId === nextTargetId)
    throw new Error('Item and target are the same');

  const changes: Array<OrderChange> = [];

  const currentItem = findItemInOrder(items, currentId);
  if (!currentItem)
    throw new Error('Current item does not exist');

  let targetItemId: string;
  if (!nextTargetId) {
    targetItemId = null;
  } else {
    const targetItem = findItemInOrder(items, nextTargetId);
    if (!targetItem)
      throw new Error('Current item does not exist');

    targetItemId = targetItem.id;
  }

  const previousOfCurrent = findItemsPrevious(items, currentItem.id);
  if (previousOfCurrent) {
    changes.push({ itemId: previousOfCurrent.id, nextId: currentItem.nextId });
  }

  const previousOfTarget = findItemsPrevious(items, targetItemId);
  if (previousOfTarget) {
    changes.push({ itemId: previousOfTarget.id, nextId: currentItem.id });
  }

  changes.push({ itemId: currentItem.id, nextId: targetItemId });

  return new OrderChanges(changes);

}

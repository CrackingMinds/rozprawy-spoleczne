import { OrderChange, OrderChanges } from 'app/shared/order-utils/change/order.change';
import { Ordered } from 'app/shared/order-utils/ordered';

export function calcOrderChange(items: Array<Ordered>, currentId: string, nextTargetId: string): OrderChanges {

  if (!items)
    throw new Error('Initial order is not provided');

  if (!items.length)
    throw new Error('Initial order is empty');

  if (currentId === nextTargetId)
    throw new Error('Item and target are the same');

  const changes: Array<OrderChange> = [];

  const currentItem = findItem(items, currentId);
  if (!currentItem)
    throw new Error('Current item does not exist');

  const targetItem = findItem(items, nextTargetId);
  if (!targetItem)
    throw new Error('Current item does not exist');

  const previousOfCurrent = findPrevious(items, currentItem.id);
  if (previousOfCurrent) {
    changes.push({ itemId: previousOfCurrent.id, nextId: currentItem.nextId });
  }

  const previousOfTarget = findPrevious(items, targetItem.id);
  if (previousOfTarget) {
    changes.push({ itemId: previousOfTarget.id, nextId: currentItem.id });
  }

  changes.push({ itemId: currentItem.id, nextId: targetItem.id });

  return new OrderChanges(changes);

}

function findPrevious(items: Array<Ordered>, currentId: string): Ordered {
  const result = items.filter((item: Ordered) => item.nextId === currentId);
  if (!result.length)
    return null;

  return result[0];
}

function findItem(items: Array<Ordered>, id: string): Ordered {
  const result = items.filter((item: Ordered) => item.id === id);
  if (!result.length)
    return null;

  return result[0];
}

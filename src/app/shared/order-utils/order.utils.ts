import { OrderedWithId } from 'app/shared/order-utils/ordered';

export function findItemsPrevious(items: Array<OrderedWithId>, currentId: string): OrderedWithId {
  const result = items.filter((item: OrderedWithId) => item.nextId === currentId);
  if (!result.length)
    return null;

  return result[0];
}

export function findItemInOrder(items: Array<OrderedWithId>, id: string): OrderedWithId {
  const result = items.filter((item: OrderedWithId) => item.id === id);
  if (!result.length)
    return null;

  return result[0];
}

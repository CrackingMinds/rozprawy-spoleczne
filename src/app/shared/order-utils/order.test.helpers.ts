import { OrderedWithId } from 'app/shared/order-utils/ordered';

export function generateInitialOrder(): Array<OrderedWithId> {
  return [
    { id: 'a', nextId: null },
    { id: 'b', nextId: 'a' },
    { id: 'c', nextId: 'b' },
    { id: 'd', nextId: 'c' }
  ];
}

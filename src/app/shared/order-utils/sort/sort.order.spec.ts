import { OrderedWithId } from 'app/shared/order-utils/ordered';
import { OrderedItemsSorter } from 'app/shared/order-utils/sort/ordered.items.sorter';

describe('sort by order -', () => {

  it('should accurately sort given values', () => {

    const expectedValues: Array<OrderedWithId> = [
      { id: 'a', nextId: null },
      { id: 'b', nextId: 'a' },
      { id: 'c', nextId: 'b' },
      { id: 'd', nextId: 'c' }
    ];

    // given
    const initialValues: Array<OrderedWithId> = [
      { id: 'd', nextId: 'c' },
      { id: 'c', nextId: 'b' },
      { id: 'a', nextId: null },
      { id: 'b', nextId: 'a' }
    ];

    // when
    const sortedValues = OrderedItemsSorter.sort(initialValues);

    // then
    sortedValues.forEach((value: OrderedWithId, index: number) => {
      const actualId = value.id;
      const expectedId = expectedValues[index].id;
      expect(actualId).toBe(expectedId);
    });

  });

});

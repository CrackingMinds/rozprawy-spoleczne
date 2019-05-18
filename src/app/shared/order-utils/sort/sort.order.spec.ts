import { Ordered } from 'app/shared/order-utils/ordered';
import { OrderedItemsSorter } from 'app/shared/order-utils/sort/ordered.items.sorter';

describe('sort by order -', () => {

  it('should accurately sort given values', () => {

    const expectedValues: Array<Ordered> = [
      { id: 'a', nextId: null },
      { id: 'b', nextId: 'a' },
      { id: 'c', nextId: 'b' },
      { id: 'd', nextId: 'c' }
    ];

    // given
    const initialValues: Array<Ordered> = [
      { id: 'd', nextId: 'c' },
      { id: 'c', nextId: 'b' },
      { id: 'a', nextId: null },
      { id: 'b', nextId: 'a' }
    ];

    // when
    const sortedValues = OrderedItemsSorter.sort(initialValues);

    // then
    sortedValues.forEach((value: Ordered, index: number) => {
      const actualId = value.id;
      const expectedId = expectedValues[index].id;
      expect(actualId).toBe(expectedId);
    });

  });

});

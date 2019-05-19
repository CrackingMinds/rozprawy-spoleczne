import { generateInitialOrder } from 'app/shared/order-utils/order.test.helpers';
import { getNextIdForNewItem } from 'app/shared/order-utils/add/add.to.order';

import { OrderedWithId } from 'app/shared/order-utils/ordered';

describe('add to order -', () => {

  let initialOrder: Array<OrderedWithId>;

  beforeEach(() => {
    initialOrder = generateInitialOrder();
  });

  afterAll(() => {
    initialOrder = null;
  });

  it('should return correct nextId for item being added to order', () => {

    // when
    const nextId = getNextIdForNewItem(initialOrder);

    // then
    expectIdToEqualLastItemsId(nextId);

  });

  describe('should throw error -', () => {

    it('initial order is not provided', () => {

      // when & then
      expect(() => getNextIdForNewItem(null)).toThrow();

    });

    it('initial order is empty', () => {

      // when & then
      expect(() => getNextIdForNewItem([])).toThrow();

    });

  });

  function getA(): OrderedWithId {
    return initialOrder[0];
  }

  function getB(): OrderedWithId {
    return initialOrder[1];
  }

  function getC(): OrderedWithId {
    return initialOrder[2];
  }

  function getD(): OrderedWithId {
    return initialOrder[3];
  }

  function expectIdToEqualLastItemsId(id: string): void {
    expect(id).toBe(getD().id);
  }

});

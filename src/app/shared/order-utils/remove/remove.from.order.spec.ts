import { generateInitialOrder } from 'app/shared/order-utils/order.test.helpers';
import { removeFromOrder } from 'app/shared/order-utils/remove/remove.from.order';

import { OrderedWithId } from 'app/shared/order-utils/ordered';
import { OrderChanges } from 'app/shared/order-utils/change/order.change';

describe('remove from order -', () => {

  let initialOrder: Array<OrderedWithId>;

  beforeEach(() => {
    initialOrder = generateInitialOrder();
  });

  afterAll(() => {
    initialOrder = null;
  });

  it('should accurately calc changes for removing item from order', () => {

    // given
    const itemToBeRemoved: OrderedWithId = getB();

    // when
    const orderChanges = removeFromOrder(initialOrder, itemToBeRemoved.id);

    // then
    expectItemsPreviousToFollowItemsNext(orderChanges, itemToBeRemoved.id, getC().id, getA().id);
    expect(orderChanges.length).toBe(1);

  });

  it('should accurately calc changes for removing item from order when this item is last', () => {

    // given
    const itemToBeRemoved: OrderedWithId = getD();

    // when
    const orderChanges = removeFromOrder(initialOrder, itemToBeRemoved.id);

    // then
    expect(orderChanges.length).toBe(0);

  });

  describe('should throw error -', () => {

    it('non existent item', () => {

      // given
      const itemToBeRemoved: OrderedWithId = { id: 'non-existent', nextId: 'any' };

      // when & then
      expect(() => removeFromOrder(initialOrder, itemToBeRemoved.id)).toThrow();

    });

    it('initial order is not provided', () => {

      // given
      const itemToBeRemoved: OrderedWithId = getA();

      // when & then
      expect(() => removeFromOrder(null, itemToBeRemoved.id)).toThrow();

    });

    it('initial order is empty', () => {

      // given
      const itemToBeRemoved: OrderedWithId = getA();

      // when & then
      expect(() => removeFromOrder([], itemToBeRemoved.id)).toThrow();

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

  function expectItemsPreviousToFollowItemsNext(orderChanges: OrderChanges, idOfItemToBeDeleted: string, idOfItemsPrevious: string, idOfItemsNext: string): void {
    const changeOfItemsPrevious = orderChanges.getItemChange(idOfItemsPrevious);
    expect(changeOfItemsPrevious.nextId).toBe(idOfItemsNext);
  }

});

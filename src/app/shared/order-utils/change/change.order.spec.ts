import { calcOrderChange } from 'app/shared/order-utils/change/change.order';

import { Ordered } from 'app/shared/order-utils/ordered';
import { OrderChanges } from 'app/shared/order-utils/change/order.change';

describe('change order -', () => {

  let initialOrder: Array<Ordered>;

  beforeEach(() => {
    initialOrder = generateInitialOrder();
  });

  afterAll(() => {
    initialOrder = null;
  });

  it('should accurately calc order change for default scenario', () => {

    // given
    const targetToFollow = getA();
    const prevOfTarget = getB();

    const item = getC();
    const prevOfItem = getD();

    // when
    const orderChanges = calcOrderChange(initialOrder, item.id, targetToFollow.id);

    // then
    expectItemToFollowTarget(orderChanges, item.id, targetToFollow.id);
    expectTargetsPreviousToFollowItem(orderChanges, prevOfTarget.id, item.id);
    expectItemsPreviousToFollowItemsNext(orderChanges, prevOfItem.id, item.nextId);
    expect(orderChanges.length).toBe(3);

  });

  it('should accurately calc order change when item is placed last', () => {

    // given
    const targetToFollow = getD();

    const item = getB();
    const prevOfItem = getC();

    // when
    const orderChanges = calcOrderChange(initialOrder, item.id, targetToFollow.id);

    // then
    expectItemToFollowTarget(orderChanges, item.id, targetToFollow.id);
    expectItemsPreviousToFollowItemsNext(orderChanges, prevOfItem.id, item.nextId);
    expect(orderChanges.length).toBe(2);

  });

  it('should accurately calc order change last item is moved elsewhere', () => {

    // given
    const targetToFollow = getA();
    const prevOfTarget = getB();

    const item = getD();

    // when
    const orderChanges = calcOrderChange(initialOrder, item.id, targetToFollow.id);

    // then
    expectItemToFollowTarget(orderChanges, item.id, targetToFollow.id);
    expectTargetsPreviousToFollowItem(orderChanges, prevOfTarget.id, item.id);
    expect(orderChanges.length).toBe(2);

  });

  describe('should throw error -', () => {

    it('target and item are the same', () => {

      // given
      const targetToFollow = getA();
      const item = getA();

      // when & then
      expect(() => calcOrderChange(initialOrder, item.id, targetToFollow.id)).toThrow();

    });

    it('non existent item', () => {

      // given
      const targetToFollow = getA();
      const item = { id: 'non-existent', nextId: 'any' };

      // when & then
      expect(() => calcOrderChange(initialOrder, item.id, targetToFollow.id)).toThrow();

    });

    it('non existent target', () => {

      // given
      const targetToFollow: Ordered = { id: 'non-existent', nextId: 'any' };
      const item = getA();

      // when & then
      expect(() => calcOrderChange(initialOrder, item.id, targetToFollow.id)).toThrow();

    });

    it('initial order is not provided', () => {

      // given
      const targetToFollow = getA();
      const item = getC();

      // when & then
      expect(() => calcOrderChange(null, item.id, targetToFollow.id)).toThrow();

    });

    it('initial order is empty', () => {

      // given
      const targetToFollow = getA();
      const item = getC();

      // when & then
      expect(() => calcOrderChange([], item.id, targetToFollow.id)).toThrow();

    });

  });

  function getA(): Ordered {
    return initialOrder[0];
  }

  function getB(): Ordered {
    return initialOrder[1];
  }

  function getC(): Ordered {
    return initialOrder[2];
  }

  function getD(): Ordered {
    return initialOrder[3];
  }

  function expectItemToFollowTarget(orderChanges: OrderChanges, itemId: string, targetId: string): void {
    const changeOfItem = orderChanges.getItemChange(itemId);
    expect(changeOfItem.nextId).toBe(targetId);
  }

  function expectItemsPreviousToFollowItemsNext(orderChanges: OrderChanges, idOfItemsPrevious: string, idOfItemsNext: string): void {
    const changeOfItemsPrevious = orderChanges.getItemChange(idOfItemsPrevious);
    expect(changeOfItemsPrevious.nextId).toBe(idOfItemsNext);
  }

  function expectTargetsPreviousToFollowItem(orderChanges: OrderChanges, idOfTargetsPrevious: string, itemId: string): void {
    const changeOfTargetsPrevious = orderChanges.getItemChange(idOfTargetsPrevious);
    expect(changeOfTargetsPrevious.nextId).toBe(itemId);
  }

});

function generateInitialOrder(): Array<Ordered> {
  return [
    { id: 'a', nextId: null },
    { id: 'b', nextId: 'a' },
    { id: 'c', nextId: 'b' },
    { id: 'd', nextId: 'c' }
  ];
}

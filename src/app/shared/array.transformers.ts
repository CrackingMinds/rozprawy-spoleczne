import { CustomSorting } from 'app/shared/custom.sorting';

import { SortableWithId } from 'app/models/sortable';
import { Ordered } from 'app/shared/order-utils/ordered';

export function sortableToOrdered(items: Array<SortableWithId>): Array<SortableWithId & Ordered> {

  const result: Array<SortableWithId & Ordered> = [];

  const sortedItems = [...items].sort(CustomSorting.byCustomOrder);
  sortedItems.forEach((item: SortableWithId, index: number, initialArray: Array<SortableWithId>) => {

    let nextId: string;

    if (index === 0) {
      nextId = null;
    } else {
      nextId = initialArray[index - 1].id;
    }

    result.push({
      ...item,
      nextId: nextId
    });

  });

  return result;

}

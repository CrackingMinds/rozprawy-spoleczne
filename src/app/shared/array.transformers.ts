import { Sortable } from 'app/models/sortable';
import { CustomSorting } from 'app/shared/custom.sorting';

import { Ordered } from 'app/shared/order-utils/ordered';

export function sortableToOrdered(items: Array<Sortable>): Array<Sortable & Ordered> {

  const result: Array<Sortable & Ordered> = [];

  const sortedItems = [...items].sort(CustomSorting.byCustomOrder);
  sortedItems.forEach((item: Sortable, index: number, initialArray: Array<Sortable & { id: string }>) => {

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

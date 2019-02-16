import { Sortable } from 'app/models/sortable';

export class CustomSorting {

  static byCustomOrder(a: Sortable, b: Sortable): number {
    const indexOfA = a.index;
    const indexOfB = b.index;

    if (indexOfA < indexOfB) {
      return -1;
    } else if (indexOfA > indexOfB) {
      return 1;
    } else {
      return 0;
    }
  }

}

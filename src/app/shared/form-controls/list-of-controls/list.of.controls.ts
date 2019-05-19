import { ControlValueAccessor, Validator } from '@angular/forms';

import { Ordered } from 'app/shared/order-utils/ordered';
import { OrderChanges } from 'app/shared/order-utils/change/order.change';

export type ListOfControlsControl = ControlValueAccessor & Validator;

export type ListOfControlsValueUpdate<T> = {
  controlIndex: number;
  controlValue: T;
};

export type ListOfControlsValueCreate<T> = {
  controlIndex: number;
  controlValue: T;
} & Ordered;

export type ListOfControlsValueRemove = {
  indexOfControlToRemove: number;
  orderChanges: OrderChanges;
};

export type ListOfControlsOrderChange = OrderChanges;

import { Ordered } from 'app/shared/order-utils/ordered';

export type IndexingInfo = Array<IndexingInfoItem>;

export type IndexingInfoItem = IndexingInfoItemBase & {
  id: string;
};

type IndexingInfoItemBase = RawIndexingInfoItem & Ordered;

export type RawIndexingInfoItem = {
  name: string;
  value: string;
};

export type IndexingInfoItemEntity = IndexingInfoItemBase;

export type NewIndexingInfoItem = IndexingInfoItemBase;

export type UpdatedIndexingInfoItem = IndexingInfoItem;

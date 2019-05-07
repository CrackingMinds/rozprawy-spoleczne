import { Sortable } from 'app/models/sortable';

export type IndexingInfo = Array<IndexingInfoItem>;

export type IndexingInfoItem = IndexingInfoItemBase & {
  id: string;
};

type IndexingInfoItemBase = RawIndexingInfoItem & Sortable;

export type RawIndexingInfoItem = {
  name: string;
  value: string;
};

export type IndexingInfoItemEntity = IndexingInfoItemBase;

export type NewIndexingInfoItem = IndexingInfoItemBase;

export type UpdatedIndexingInfoItem = IndexingInfoItem;

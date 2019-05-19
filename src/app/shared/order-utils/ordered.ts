export type Ordered = {
  nextId: string;
}

export type OrderedWithId = Ordered & {
  id: string;
};

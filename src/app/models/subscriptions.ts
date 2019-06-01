export type SubscriptionInfo = SubscriptionInfoEntity & {
  id: string;
};

export type SubscriptionInfoEntity = {
  name: string;
  price: number;
  currency: string;
};

export type SubscriptionsInfo = Array<SubscriptionInfo>;

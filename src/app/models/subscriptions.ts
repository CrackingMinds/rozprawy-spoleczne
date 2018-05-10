export interface ISubscription {
    name: string;
    price: number;
    currency: string;
}

export interface ISubsriptionsInfo {
    subscriptions: ISubscription[];
    contactEmail: string;
}
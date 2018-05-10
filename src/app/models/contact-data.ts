import {IPhoneNum} from "./phone-num";

export interface IContactData {
    headEditor: string;
    issn: string;
    publisher: string;
    email: string;
    phone_num: IPhoneNum;
}
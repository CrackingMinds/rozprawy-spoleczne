import {IPhoneNum, PhoneNum} from "./phone-num";

export interface IContactInfo {
    headEditor: string;
    issn: string;
    publisher: string;
    email: string;
    phone_num: IPhoneNum;
}

export class ContactInfo implements IContactInfo{
    headEditor: string = '';
    issn: string = '';
    publisher: string = '';
    email: string = '';
    phone_num: IPhoneNum = new PhoneNum();
}

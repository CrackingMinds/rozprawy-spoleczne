import {IPhoneNum, PhoneNum} from "./phone-num";

export interface IContactData {
    headEditor: string;
    issn: string;
    publisher: string;
    email: string;
    phone_num: IPhoneNum;
}

export class ContactData implements IContactData{
    headEditor: string = '';
    issn: string = '';
    publisher: string = '';
    email: string = '';
    phone_num: IPhoneNum = new PhoneNum();
}
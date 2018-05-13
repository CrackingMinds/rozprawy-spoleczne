export interface IPhoneNum {
    countryCode: string;
    number: string;
    ext: string;
}

export class PhoneNum implements IPhoneNum{
    countryCode: string = '';
    number: string = '';
    ext: string = '';
}
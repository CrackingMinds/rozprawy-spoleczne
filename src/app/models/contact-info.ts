import { PhoneNum } from "./phone-num";

export type ContactInfoEntity = {
  headEditor: string;
  publisher: string;
  email: string;
  phoneNumber: PhoneNum;
};

export type ContactInfo = ContactInfoEntity & {
  id: string;
};

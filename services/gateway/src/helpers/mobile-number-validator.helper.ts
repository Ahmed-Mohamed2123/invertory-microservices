import {PhoneNumberUtil} from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function isValidPhone(phoneNumber: string): boolean {
  if ((!phoneNumber || phoneNumber.length === 0)) {
    return false;
  }
  let isValidPhone;
  try {
    const parsedMobile = phoneNumberUtil.parseAndKeepRawInput(
      `+${phoneNumber}`
    );
    isValidPhone = phoneNumberUtil.getNumberType(parsedMobile) === 1;
  } catch (e) {
    isValidPhone = false;
  }
  return isValidPhone;
}
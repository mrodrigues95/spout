export const hidePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/.(?=.{4,}$)/g, '*');

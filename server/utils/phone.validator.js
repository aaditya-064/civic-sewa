import pkg from "google-libphonenumber";
const { PhoneNumberFormat, PhoneNumberUtil, PhoneNumberType } = pkg;

const phoneUtil = PhoneNumberUtil.getInstance();

const validatePhoneNumber = (phoneNumber, countryCode = "NP") => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
    const isValid = phoneUtil.isValidNumber(number, countryCode);
    if (!isValid) return false;
    const numberType = phoneUtil.getNumberType(number);

    // Accept only mobile numbers of type MOBILE
    if (numberType !== PhoneNumberType.MOBILE) return false;

    // Additional length check: make sure national number length is 10 digits
    const nationalNumber = number.getNationalNumber().toString();
    if (nationalNumber.length !== 10) return false;

    const formatted = phoneUtil.format(number, PhoneNumberFormat.E164);
    console.log(formatted);
    return formatted;
  } catch (err) {
    throw new Error("Phone Number Parsing Failed");
  }
};

export const validatePhone = (phoneNumber) => {
  try {
    const updatedNumber = String(phoneNumber).trim();
    const validatedPhone = validatePhoneNumber(updatedNumber, "NP");
    if (!validatedPhone) {
      const err = new Error("Invalid Phone Number");
      err.statusCode = 401;
      throw err;
    }
    return validatedPhone;
  } catch (err) {
    throw new Error("Invalid Phone Number");
  }
};

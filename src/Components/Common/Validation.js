export const validateEmail = (email) => /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);



export const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);

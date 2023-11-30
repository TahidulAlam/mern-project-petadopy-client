/* eslint-disable no-useless-escape */
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function isValidPassword(password) {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]{6,}$/;
  return passwordPattern.test(password);
}
export { isValidEmail, isValidPassword };

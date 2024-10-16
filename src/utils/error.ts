/* eslint-disable @typescript-eslint/no-explicit-any */
export const getErrorMessageSignUp = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      const errors: { [key: string]: string } = {};
      response.message.forEach((msg: string) => {
        if (msg.includes("name")) errors.name = formatErrorMessage(msg);
        else if (msg.includes("email")) errors.email = formatErrorMessage(msg);
        else if (msg.includes("password"))
          errors.password = formatErrorMessage(msg);
      });
      return errors;
    }
    return { general: formatErrorMessageSignUp(response.message) };
  }
  return { general: "Unknown error occurred." };
};

const formatErrorMessageSignUp = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }
  return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

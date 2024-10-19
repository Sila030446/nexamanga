import { jwtDecode } from "jwt-decode";

export const AUTHENTICATION_COOKIE = "Authentication";
export const REFRESH_TOKEN_COOKIE = "Refresh";

export const getAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (!setCookieHeader) {
    return;
  }
  const accessToken = setCookieHeader
    .split(";")
    .find((cookieHeader) => cookieHeader.includes(AUTHENTICATION_COOKIE))
    ?.split("=")[1];

  const refreshToken = setCookieHeader
    .split(";")
    .find((cookieHeader) => cookieHeader.includes(REFRESH_TOKEN_COOKIE))
    ?.split("=")[1];

  return {
    accessToken: accessToken && {
      name: AUTHENTICATION_COOKIE,
      value: accessToken,
      secure: true,
      httpOnly: true,

      expires: new Date(jwtDecode(accessToken).exp! * 1000),
    },
    refreshToken: refreshToken && {
      name: REFRESH_TOKEN_COOKIE,
      value: refreshToken,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(refreshToken).exp! * 1000),
    },
  };
};

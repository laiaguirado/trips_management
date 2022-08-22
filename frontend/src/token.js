import jwt_decode from "jwt-decode";

export const readToken = () => {
  const tokenStr = localStorage.getItem("token");
  return tokenStr !== null ? JSON.parse(tokenStr) : null;
};
export const saveToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const isTokenExpired = () => {
  const tokenStr = localStorage.getItem("token");
  if (tokenStr !== null) {
    const token = JSON.parse(tokenStr);
    if (token !== null) {
      const tokenDecode = jwt_decode(token.accessToken);
      const p = tokenDecode.exp * 1000 < Date.now();
      console.log(` Token.istokenExpired = ${p}`);
      return p;
    }
  }
  console.log(` token.isTokenExpired. No hay token`);
  return true;
};

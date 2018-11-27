import jwt from "jsonwebtoken";

const getToken = userId => {
  return jwt.sign({ userId }, process.env.TOP_SECRET);
};

export default getToken;

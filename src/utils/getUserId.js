import jwt from "jsonwebtoken";

const getUserId = request => {
  const header = request.request.headers.authorization;
  if (!header) 
   throw new Error("Authorization required");
  const token = header.split(" ")[1];
  const decode = jwt.verify(token, process.env.TOP_SECRET);
  return decode.userId;
};

export default getUserId;

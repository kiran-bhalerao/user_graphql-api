import getUserId from "../utils/getUserId";
export default {
  email: {
    fragment: 'fragment userFrag on User {id}',
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      if (parent.id == userId) 
       return parent.email;
      else 
       return null;
    }
  }
};

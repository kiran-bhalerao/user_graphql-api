import bcrypt from 'bcryptjs';
import getToken from '../utils/getToken'
import getUserId from '../utils/getUserId'
export default {
  async createUser(parent,args,{prisma},info){
    const emailExists = await prisma.exists.User({email: args.data.email});
    if(emailExists)
    throw new Error("Email already exists.");

    const password = await bcrypt.hash(args.data.password, 10);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });
    const token = getToken(user.id);
    return {
      token,
      user
    }
  },
  deleteUser(parent,args,{prisma , request},info){
    const userId = getUserId(request);
    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    },info);
  },
  updateUser(parent,args,{prisma, request},info){
    const userId = getUserId(request);
    return prisma.mutation.updateUser({
      data: args.data,
      where: {
        id: userId
      }
    },info);
  },
  async login(parent, { email, password }, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email
      }
    });
    if (!user)
      throw new Error("Invalid password.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error("Invalid passowrd.");
    return {
      token: getToken(user.id),
      user
    }
  }
}
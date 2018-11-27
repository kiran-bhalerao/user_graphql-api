export default {
  users(parent, args, { prisma }, info) {
    return prisma.query.users(null);
  }
};

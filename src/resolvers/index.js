import Query from "./Query";
import User from "./User";
import Mutation from "./Mutation";
import { extractFragmentReplacements } from "prisma-binding";

const resolvers = {
  Query,
  Mutation,
  User
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers,fragmentReplacements };

import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2i4RWNgD5Z0PergdLcBkNCMfHL1",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};

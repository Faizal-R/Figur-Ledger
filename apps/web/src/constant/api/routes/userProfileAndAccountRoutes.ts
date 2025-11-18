export const UserProfileRoutes = {
  GET: (userId: string) => `/users/${userId}`,
  UPDATE: (userId: string) => `/users/${userId}`,
  DELETE: (userId: string) => `/users/${userId}`,
} as const;

export const AccountRoutes = {
  CREATE: "/accounts/create",
  GET_ACCOUNTS_BY_USER_ID: (userId: string) =>
    `/users/accounts?userId=${userId}`,
} as const;


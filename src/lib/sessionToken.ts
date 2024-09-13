// No solution to access Clerk client from outside hooks yet and don't want to impor Clerk from clerk-js
type WindowWithClerk = Window & {
  Clerk?: {
    session?: {
      getToken(): Promise<string | null>;
    };
  };
};

export const getSessionToken = async () => {
  if (!(window as WindowWithClerk).Clerk?.session) return null;
  return (
    (await (window as WindowWithClerk)?.Clerk?.session?.getToken()) ?? null
  );
};

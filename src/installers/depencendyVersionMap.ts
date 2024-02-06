/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.24.5",
  "@next-auth/prisma-adapter": "^1.0.7",
  "@auth/drizzle-adapter": "^0.3.6",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;

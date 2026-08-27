import { Role } from "@prisma/client";

export type { Role };

export type Permission =
  | "listing:create"
  | "listing:edit"
  | "listing:delete"
  | "listing:host_pro_dungeon"
  | "listing:verify"
  | "comment:create"
  | "comment:delete_any"
  | "user:moderate";

const PERMISSION_MATRIX: Record<Role, Permission[]> = {
  USER: [
    "listing:create",
    "listing:edit",
    "comment:create",
  ],
  VERIFIED_HOST: [
    "listing:create",
    "listing:edit",
    "listing:host_pro_dungeon",
    "comment:create",
  ],
  VERIFIED_PROVIDER: [
    "listing:create",
    "listing:edit",
    "comment:create",
  ],
  DOMINANT: [
    "listing:create",
    "listing:edit",
    "comment:create",
  ],
  SUBMISSIVE: [
    "listing:create",
    "listing:edit",
    "comment:create",
  ],
  CREATOR: [
    "listing:create",
    "listing:edit",
    "comment:create",
  ],
  MODERATOR: [
    "listing:create",
    "listing:edit",
    "comment:create",
    "comment:delete_any",
    "user:moderate",
  ],
  ADMIN: [
    "listing:create",
    "listing:edit",
    "listing:delete",
    "listing:host_pro_dungeon",
    "listing:verify",
    "comment:create",
    "comment:delete_any",
    "user:moderate",
  ],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  const allowedPermissions = PERMISSION_MATRIX[userRole];
  if (!allowedPermissions) return false;
  return allowedPermissions.includes(permission);
}

export function assertPermission(userRole: Role, permission: Permission): void {
  if (!hasPermission(userRole, permission)) {
    throw new Error(`Forbidden: User with role ${userRole} lacks ${permission} permission.`);
  }
}
"use client";

import React from "react";
import { Role } from "@prisma/client";
import { Permission, hasPermission } from "@/lib/auth/rbac";

interface PermissionGuardProps {
  userRole?: Role;
  permission: Permission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({
  userRole = Role.USER,
  permission,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const allowed = hasPermission(userRole, permission);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
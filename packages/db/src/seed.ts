// Load environment variables before importing db
import dotenv from "dotenv";
dotenv.config({ path: "../../apps/web/.env" });

import { db } from "@open-audit/db";
import { user } from "@open-audit/db/schema/auth";
import { role, permission } from "@open-audit/db/schema/roles";
import { eq } from "drizzle-orm";

const nanoid = () => Math.random().toString(36).substring(2, 15);

const ROLES = [
  {
    name: "administrator",
    description: "Full system access with all permissions",
    permissions: ["all"],
    isSystem: true,
  },
  {
    name: "manager",
    description: "Can manage audits and users within scope",
    permissions: [
      "audits.read",
      "audits.create",
      "audits.update",
      "audits.delete",
      "users.read",
      "reports.read",
      "reports.create",
      "templates.read",
      "templates.create",
    ],
    isSystem: true,
  },
  {
    name: "auditor",
    description: "Can conduct audits and view assigned audits",
    permissions: [
      "audits.read",
      "audits.update",
      "reports.read",
      "reports.create",
      "checklists.read",
      "checklists.complete",
    ],
    isSystem: true,
  },
  {
    name: "stakeholder",
    description: "Read-only access to assigned audits",
    permissions: ["audits.read", "reports.read"],
    isSystem: true,
  },
];

const PERMISSIONS = [
  { name: "audits.read", description: "View audits", category: "audits" },
  { name: "audits.create", description: "Create new audits", category: "audits" },
  { name: "audits.update", description: "Edit audits", category: "audits" },
  { name: "audits.delete", description: "Delete audits", category: "audits" },
  { name: "users.read", description: "View users", category: "users" },
  { name: "users.create", description: "Create users", category: "users" },
  { name: "users.update", description: "Edit users", category: "users" },
  { name: "users.delete", description: "Delete users", category: "users" },
  { name: "users.assign_roles", description: "Assign roles to users", category: "users" },
  { name: "reports.read", description: "View reports", category: "reports" },
  { name: "reports.create", description: "Create reports", category: "reports" },
  { name: "reports.update", description: "Edit reports", category: "reports" },
  { name: "reports.delete", description: "Delete reports", category: "reports" },
  { name: "reports.export", description: "Export reports", category: "reports" },
  { name: "templates.read", description: "View templates", category: "templates" },
  { name: "templates.create", description: "Create templates", category: "templates" },
  { name: "templates.update", description: "Edit templates", category: "templates" },
  { name: "templates.delete", description: "Delete templates", category: "templates" },
  { name: "checklists.read", description: "View checklists", category: "checklists" },
  { name: "checklists.create", description: "Create checklists", category: "checklists" },
  { name: "checklists.update", description: "Edit checklists", category: "checklists" },
  { name: "checklists.complete", description: "Complete checklists", category: "checklists" },
  { name: "settings.read", description: "View system settings", category: "settings" },
  { name: "settings.update", description: "Update system settings", category: "settings" },
];

async function seed() {
  console.log("🌱 Starting database seed...\n");

  // Insert permissions
  console.log("📋 Inserting permissions...");
  const insertedPermissions = await db
    .insert(permission)
    .values(PERMISSIONS.map((p) => ({ id: nanoid(), ...p })))
    .onConflictDoNothing()
    .returning();
  console.log(`✅ Inserted ${insertedPermissions.length} permissions\n`);

  // Insert roles
  console.log("👥 Inserting roles...");
  const insertedRoles = await db
    .insert(role)
    .values(ROLES.map((r) => ({ id: nanoid(), ...r })))
    .onConflictDoNothing()
    .returning();
  console.log(`✅ Inserted ${insertedRoles.length} roles\n`);

  // Get administrator role
  const adminRole = await db.query.role.findFirst({
    where: eq(role.name, "administrator"),
  });

  if (!adminRole) {
    throw new Error("Administrator role not found after seeding!");
  }

  // Create admin user
  const existingAdmin = await db.query.user.findFirst({
    where: eq(user.email, "admin@openaudit.com"),
  });

  if (!existingAdmin) {
    console.log("🔐 Creating admin user...");
    const adminUser = await db
      .insert(user)
      .values({
        id: nanoid(),
        name: "System Administrator",
        email: "admin@openaudit.com",
        emailVerified: true,
        roleId: adminRole.id,
      })
      .returning();

    console.log(`✅ Created admin user: ${adminUser[0]?.email}`);
    console.log(`   Role: ${adminRole.name}\n`);
  } else {
    console.log("ℹ️  Admin user already exists, skipping creation\n");
  }

  console.log("✨ Seed completed successfully!\n");
  console.log("📊 Summary:");
  console.log(`   - ${insertedPermissions.length} permissions`);
  console.log(`   - ${insertedRoles.length} roles`);
  console.log(`   - 1 admin user (admin@openaudit.com)\n`);
}

seed()
  .then(() => {
    console.log("\n✅ Seed script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed script failed:", error);
    process.exit(1);
  });

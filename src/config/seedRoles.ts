import Role from "../models/role.model.js";

const ROLES = ["Admin", "Normal"] as const;

type RoleName = (typeof ROLES)[number];

export const seedRoles = async (): Promise<void> => {
  await Promise.all(
    ROLES.map(async (role: RoleName) => {
      const exists = await Role.findOne({ role_name: role });

      if (!exists) {
        await Role.create({ role_name: role });
        console.log(`Role '${role}' created`);
      } else {
        console.log(`Role '${role}' already exists, skipping`);
      }
    })
  );
};
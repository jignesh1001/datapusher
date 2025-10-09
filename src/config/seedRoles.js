import Role from "../models/role.model.js";

export const seedRoles = async () => {
  const roles = ["Admin", "Normal"];
  for (const role of roles) {
    const exists = await Role.findOne({ role_name: role });
    if (!exists) {
      await Role.create({ role_name: role });
      console.log(`Role '${role}' created`);
    }
  }
};

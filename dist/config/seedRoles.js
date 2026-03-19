import Role from "../models/role.model.js";
const ROLES = ["Admin", "Normal"];
export const seedRoles = async () => {
    await Promise.all(ROLES.map(async (role) => {
        const exists = await Role.findOne({ role_name: role });
        if (!exists) {
            await Role.create({ role_name: role });
            console.log(`Role '${role}' created`);
        }
        else {
            console.log(`Role '${role}' already exists, skipping`);
        }
    }));
};

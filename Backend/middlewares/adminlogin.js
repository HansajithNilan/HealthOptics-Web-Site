import UserModel from "../models/UserModel.js";

export function adminAuthorized(role = ['admin']) {
    return async function (req, res, next) {
        try {
            const admin = await UserModel.findById(req.user.id);

            if (!admin || !role.includes(admin.role)) {
                return res.status(403).json({ message: "Access Denied" });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    };
}

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.roleId)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        }


        next();
    };
};

module.exports = authorize;
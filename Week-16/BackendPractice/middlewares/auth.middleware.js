import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next) => {
    try {
        console.log(req.cookies);
        let token = req.cookies?.token
        console.log('token found:', token ? 'yes' : 'no')
        if (!token) {
            console.log("no token")
            return res.status(400).json({
                message: 'Authentication Failed'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(" decoded token value is :", decoded)
        req.user = decoded
        next();

    } catch (error) {
        console.log('Auth middleware failure')
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        })
    }

};
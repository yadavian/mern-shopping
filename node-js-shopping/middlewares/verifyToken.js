import jwt from 'jsonwebtoken'

const { JWT_SECRET_KEY } = process.env

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token || req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, JWT_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({ status: false, msg: "INVALID TOKEN.", data: error.message })
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        return res.status(403).json({ status: false, msg: "TOKEN NOT EXIST." })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ status: false, msg: "YOU ARE NOT VALID USER NOR ADMIN, ACCESS DENIED." })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ status: false, msg: "YOU ARE NOT ADMIN, ACCESS DENIED TO NORMAL USERS." })
        }
    })
}

export { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization }
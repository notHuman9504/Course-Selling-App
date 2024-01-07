const adminKey="Admin Secr3t";
const userKey="User Secr3t";

const authadminjwt=(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, adminKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
        });
    } else {
        res.sendStatus(401);
    }
}

const authuserjwt=(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, userKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
        });
    } else {
        res.sendStatus(401);
    }
}
export {adminKey,userKey,authadminjwt,authuserjwt};


module.exports = function (req, res, next){

    if(!req.user.roles.isAdmin) return res.status(403).send('Not Authorized, No admin rights available');

    if(!req.user.roles.isDeveloper) return res.status(403).send('Not Authorized, No developer rights available');

    next();

}
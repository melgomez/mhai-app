module.exports = (req, res, next) => {
    let user;
    if (req.isAuthenticated()) {
        console.log('Secuirty Passed!')
        user = req.user; 
        next ();
    } else {
        console.log('Not Logged!')
        res.redirect('/');
    }
}
const {User, validate} = require('../models/user');

module.exports = {
    index: async (req, res) => {
        let users = await User.find();
        res.send(users)
    },
    show: async (req, res) => {
        let user =  await FindById(req.params.id);
        if(!user) return res.status(404).send('The user with the given ID was not found.')
    },
    signup: (req, res) => {
        res.render('signup', {title: 'New User Registration'});
    },
    create: async (req, res) => {
        let { error } = validate(req.body);
        if(error) return res.status(404).send(error.details[0].message);

        let newUser = new User(req.body);

        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.username = req.body.username;
        newUser.phone = req.body.phone;
        newUser.password = await newUser.generateHash(req.body.password);

        await newUser.save();
        
        res.redirect('/');

    },
    update: async (req, res) => {
        let { error } = validate(req.body);
        if(error) return res.status(404).send(error.details[0].message);

        let { username, firstname, lastname, password, phone } = req.body
        
        let user = await User.findByIdAndUpdate(req.params.id, {firstname, lastname, password, phone, username }, { new: true });
        
        if(!user) return res.status(404).send('The user with the given ID was not found.');

        res.send(user);
    },
    delete: async (req, res) => {
        // let user = await User.findByIdAndRemove(req.params.id);
        let user = await User.remove({});

        // if(!user) return res.status(404).send('The user with the given ID was not found.');
        // res.send(user);

        res.send('Cleared users.').status(200);
    },
    sessionCreate: (req, res) => {
        res.redirect('/me');
    },
    sessionDestroy: async (req, res) => {
        await req.logout();
        await req.session.destroy();
        res.redirect('/')
    }
}
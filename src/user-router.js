const Router = require('../framework/Router');

const router = new Router();

const users = [
    { id: 1, name: 'Richard' },
    { id: 2, name: 'Ja13a' },
    { id: 3, name: 'hellgoose' },
]

router.get('/users', (req, res) => {
    res.send(users);
});

router.post('/users', (req, res) => {
    const user = req.body;

    users.push({ id: users.length + 1, ...user });

    res.send(users);
});

module.exports = router;

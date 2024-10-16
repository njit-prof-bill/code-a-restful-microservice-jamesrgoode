const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];
let nextId = 1;

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    //Check they gave us both the email and name
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    //Here I create a user and add it to our array of users
    const user = { id: nextId++, name, email };
    users.push(user);

    res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    //Here I am finding the user by id
    let user = undefined;
    for(let u of users)
    {
        if(u.id === parseInt(id))
        {
            user = u;
        }
    }

    //If we could not find a user by that id
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    //Here I am just checking if either the name or email don't exist
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    //Here I am finding the user by id
    let user = undefined;
    for(let u of users)
    {
        if(u.id === parseInt(id))
        {
            user = u;
        }
    }

    //If we could not find a user by that id
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    //Here I am finding the user by id
    let i = -1;
    for(let user = 0; user<users.length; user++)
    {
        if(users[user].id === parseInt(id))
        {
            i = user;
            break;
        }
    }

    //Error if we could not find a user by that id
    if (i === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(i, 1);
    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async (req, res) => {
    try {
        await client.connect();
        const database = client.db('techblog');

        // Access different collections
        const usersCollection = database.collection('users');
        const blogsCollection = database.collection('blogs');

        if (req.method === 'GET') {
            // Retrieve all users and blogs
            const users = await usersCollection.find({}).toArray();
            const blogs = await blogsCollection.find({}).toArray();

            res.status(200).json({ users, blogs }); // Return both collections
        } else if (req.method === 'POST') {
            const newUser = req.body; // Assume you're sending a user object in the request body

            // Basic validation for newUser (optional but recommended)
            if (!newUser || !newUser.username || !newUser.email) {
                return res.status(400).json({ error: 'Invalid user data' });
            }

            const result = await usersCollection.insertOne(newUser);
            res.status(201).json(result);
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ error: 'Failed to connect to the database' });
    } finally {
        await client.close();
    }
};
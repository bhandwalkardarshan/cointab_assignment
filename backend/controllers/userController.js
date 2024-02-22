// controllers/userController.js
const supabase = require('../db');
const fs = require("fs")
const path = require("path")
const json2xls = require('json2xls');

async function getAllUsers(req, res) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch users from the database.' });
    }
}

async function getSingleUser(req, res) {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch user from the database.' });
    }
}

async function createUser(req, res) {
    try {
        const { error } = await supabase
            .from('users')
            .insert(req.body);

        if (error) {
            return res.status(400).json({ error: 'User with the provided ID already exists.', message: error.details });
        }

        res.send("Created!!");
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

async function addBulkUsers(req, res) {
    try {
        // Logic for adding bulk users
        const usersToAdd = req.body;
        const existingUsers = await supabase
            .from('users')
            .select('id');

        const existingUserIds = existingUsers.data.map(user => user.id);

        const usersToInsert = usersToAdd.filter(user => !existingUserIds.includes(user.id));

        if (usersToInsert.length === 0) {
            return res.json({ message: 'All users are already present in the database.' });
        }

        const { data, error } = await supabase
            .from('users')
            .insert(usersToInsert);

        if (error) {
            throw error;
        }

        res.json({ message: 'Bulk user data added successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

async function addBulkPosts(req, res) {
    try {
        // Logic for adding bulk posts
        const postsToAdd = req.body;
        
        const { data, error } = await supabase
            .from('posts')
            .insert(postsToAdd);

        if (error) {
            throw error;
        }

        res.json({ message: 'Bulk user posts added successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

async function downloadUserData(req, res) {
    try {
        // Logic for downloading user data
        const posts = req.body;
        // console.log(posts)
        if (!posts) {
            return res.status(400).json({ error: 'No data provided.' });
        }

        const xls = json2xls(posts);
        const dirPath = path.join(__dirname, 'downloads');
        const filePath = path.join(dirPath, 'exported.xlsx');

        // Check if directory exists and create it if it doesn't
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }

        fs.writeFileSync(filePath, xls, 'binary');
        
        // Set headers for file download
        res.setHeader('Content-Disposition', 'attachment; filename=exported.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        
        // Send the file
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    addBulkUsers,
    addBulkPosts,
    downloadUserData
};

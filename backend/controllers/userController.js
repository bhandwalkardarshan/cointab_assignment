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

async function getAllPostsOfUser(req, res) {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('userId', id);

        if (error) {
            throw error;
        }

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch posts from the database.' });
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


module.exports = {
    getAllUsers,
    getSingleUser,
    getAllPostsOfUser,
    createUser,
    addBulkPosts
};

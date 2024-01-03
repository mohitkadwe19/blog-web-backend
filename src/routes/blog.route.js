const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controllers/blog.controller');

/**
 * @swagger
 * /api/blog/createBlog:
 *   post:
 *     summary: Create blog
 *     description: Returns the blog that was created from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: "title"
 *               content:
 *                 type: string
 *                 example: "content"
 *               author:
 *                 type: string
 *                 example: "author"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tag1", "tag2", "tag3"]
 * 
 *     responses:
 *       200:
 *         description: Returns the blog that was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog created successfully"
 * */
blogRouter.post('/createBlog', blogController.createBlog);


module.exports = blogRouter;
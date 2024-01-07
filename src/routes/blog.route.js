const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controllers/blog.controller');
const { upload, uploadMultiple } = require('../middleware/multer')
const multer = require('multer');
const { auth } = require("../utils/jwt.middleware");

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
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tag1", "tag2", "tag3"]
 *               image: 
 *                 type: array
 *                 items:
 *                   type: {  url: string,
 *                            fileName: string,
 *                            size: number,
 *                            mimetype: string,
 *                            updatedBy: string,
 *                         }
 *                 example: [{
 *                   url: "url",
 *                   fileName: "fileName",
 *                   size: 123,
 *                   mimetype: "mimetype",
 *                   updatedBy: "email"
 *                    }]
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
blogRouter.post('/createBlog', auth, uploadMultiple, blogController.createBlog);


// Error handling middleware
blogRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res.status(500).send(err.message);
  } else {
    // An unknown error occurred when uploading.
    next(err);
  }
});
module.exports = blogRouter;
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // every route below requires login

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;

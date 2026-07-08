const NoteModel = require('../db/models/note.model');

// CREATE
async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'title is required' });
    }

    const note = await NoteModel.create({
      title,
      description,
      user: req.user.id
    });

    res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}

// READ (all notes belonging to the logged-in user)
async function getNotes(req, res) {
  try {
    const notes = await NoteModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Notes fetched successfully', notes });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}

// UPDATE (partial)
async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await NoteModel.findOne({ _id: id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;
    await note.save();

    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}

// DELETE
async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    const note = await NoteModel.findOneAndDelete({ _id: id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}

module.exports = { createNote, getNotes, updateNote, deleteNote };

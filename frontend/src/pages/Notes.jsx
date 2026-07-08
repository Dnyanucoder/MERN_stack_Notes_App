import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/notes');
      setNotes(res.data.notes);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load notes');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post('/notes', form);
      setNotes([res.data.note, ...notes]);
      setForm({ title: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create note');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    setError('');
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete note');
    }
  }

  function startEdit(note) {
    setEditingId(note._id);
    setEditForm({ title: note.title, description: note.description || '' });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  }

  async function handleUpdate(id) {
    setError('');
    try {
      const res = await api.patch(`/notes/${id}`, editForm);
      setNotes(notes.map((n) => (n._id === id ? res.data.note : n)));
      cancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update note');
    }
  }

  return (
    <div className="notes-wrap">
      <h2>Your notes</h2>

      {error && <div className="error-banner">{error}</div>}

      <form className="note-form" onSubmit={handleCreate}>
        <div className="row">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Note title"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional details"
          />
        </div>
        <button className="primary" type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add note'}
        </button>
      </form>

      {loading ? (
        <div className="loading-state">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">You don't have any notes yet. Add your first one above.</div>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              {editingId === note._id ? (
                <>
                  <div className="field">
                    <label>Title</label>
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>
                  <div className="note-actions">
                    <button className="small primary-ish" onClick={() => handleUpdate(note._id)}>
                      Save
                    </button>
                    <button className="small" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="note-title">{note.title}</div>
                  {note.description && <div className="note-desc">{note.description}</div>}
                  <div className="note-actions">
                    <button className="small" onClick={() => startEdit(note)}>
                      Edit
                    </button>
                    <button className="small danger" onClick={() => handleDelete(note._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

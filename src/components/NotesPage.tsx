import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  lastEdited: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('aesthetic-planner-notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('aesthetic-planner-notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }, [notes]);

  const handleCreateNote = () => {
    if (!title.trim() || !content.trim()) return;
    const now = new Date().toISOString();
    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: now,
      lastEdited: now
    };
    setNotes(prev => [newNote, ...prev]);
    resetForm();
  };

  const handleUpdateNote = () => {
    if (!editingNote || !title.trim() || !content.trim()) return;
    const updatedNote: Note = {
      ...editingNote,
      title: title.trim(),
      content: content.trim(),
      lastEdited: new Date().toISOString()
    };
    setNotes(prev => prev.map(note => note.id === editingNote.id ? updatedNote : note));
    resetForm();
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingNote(null);
    setIsDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex flex-col">
      <div className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl font-cursive font-bold text-primary mb-2">
            My Notes
          </h1>
          <p className="text-gray-600">Capture your thoughts and ideas</p>
        </div>

        {/* Add New Note Button */}
        <div className="flex justify-center mb-10">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setEditingNote(null);
                  setTitle('');
                  setContent('');
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus size={20} />
                Create New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-cursive text-2xl text-primary">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note here..."
                    className="min-h-[200px] resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={editingNote ? handleUpdateNote : handleCreateNote}
                    disabled={!title.trim() || !content.trim()}
                  >
                    {editingNote ? 'Update Note' : 'Create Note'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Calendar size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-cursive text-gray-600 mb-2">No notes yet</h3>
            <p className="text-gray-500">Create your first note to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {notes.map((note) => (
              <Card 
                key={note.id} 
                className="bg-white/90 backdrop-blur-soft border border-primary/10 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-cursive text-primary line-clamp-2">
                      {note.title}
                    </CardTitle>
                    <div className="flex gap-2 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditNote(note)}
                        className="h-8 w-8 text-gray-500 hover:text-primary"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNote(note.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-4 leading-relaxed">
                      {note.content}
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>Created: {formatDate(note.createdAt)}</span>
                      </div>
                      {note.lastEdited !== note.createdAt && (
                        <div className="flex items-center gap-2">
                          <Clock size={12} />
                          <span>Edited: {formatDate(note.lastEdited)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../allcss/UserList.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3500';

function UserList() {
  let [bookmarks, setBookmarks] = useState([]);
  let [filteredBookmarks, setFilteredBookmarks] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [currentBookmark, setCurrentBookmark] = useState({ _id: '', title: '', content: '' });
  let [searchTerm, setSearchTerm] = useState('');

  // Fetch bookmarks
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = () => {
    axios.get(`${API_BASE_URL}/user-api/get-bookmarks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
        setBookmarks(response.data.payload);
        setFilteredBookmarks(response.data.payload);
    })
    .catch(err => console.log("Error fetching bookmarks:", err));
};


  // Delete bookmark
  const deleteBookmark = (id) => {
    axios.delete(`${API_BASE_URL}/user-api/delete-bookmark/${id}`)
      .then(() => {
        let updatedBookmarks = bookmarks.filter(bookmark => bookmark._id !== id);
        setBookmarks(updatedBookmarks);
        setFilteredBookmarks(updatedBookmarks);
      })
      .catch(err => console.log("Error deleting bookmark:", err));
  };

  // Open modal for editing
  const openModal = (bookmark) => {
    setCurrentBookmark({ _id: bookmark._id, title: bookmark.title, content: bookmark.content });
    setShowModal(true);
  };

  // Update bookmark
  const updateBookmark = () => {
    axios.put(`${API_BASE_URL}/user-api/update-bookmark/${currentBookmark._id}`, {
      title: currentBookmark.title,
      content: currentBookmark.content
    })
    .then(() => {
      fetchBookmarks();
      setShowModal(false);
    })
    .catch(err => console.log("Error updating bookmark:", err));
  };

  // Handle Search
  useEffect(() => {
    let filtered = bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookmarks(filtered);
  }, [searchTerm, bookmarks]);

  return (
    <div className="userlist-container">
      <div className="overlay">
        <div className="userlist-box">
          <h2 className="title">🔖 Manage Your Bookmarks</h2>

          {/* Search Bar */}
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bookmarks List */}
          <div className="user-cards">
            {filteredBookmarks.map((bookmark) => (
              <div key={bookmark._id} className="user-card">
                <h5 className="user-title">{bookmark.title}</h5>
                <p className="user-content">{bookmark.content}</p>
                <div className="button-group">
                  <button className="edit-btn" onClick={() => openModal(bookmark)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => deleteBookmark(bookmark._id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for updating bookmark */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Bookmark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="form-control mb-2"
                value={currentBookmark.title}
                onChange={(e) => setCurrentBookmark({ ...currentBookmark, title: e.target.value })}
              />
              <textarea
                className="form-control mb-2"
                value={currentBookmark.content}
                onChange={(e) => setCurrentBookmark({ ...currentBookmark, content: e.target.value })}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="success" onClick={updateBookmark}>Save</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default UserList;

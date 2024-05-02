import React from 'react';
import { useState } from 'react';

function EditCharacter({ character, handleEditCharacter }) {
  const [editedCharacter, setEditedCharacter] = useState(character);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter(prevCharacter => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   handleEditCharacter(character._id, editedCharacter)
    
  };


  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <p>Name: <input type="text" name="name" value={editedCharacter.name} onChange={handleChange} /></p>
        <p>Tags: <input type="text" name="tags" value={editedCharacter.tags} onChange={handleChange} /></p>
        <p>Personality: <input type="text" name="personality" value={editedCharacter.personality} onChange={handleChange} /></p>
        <p>Relationship: <input type="text" name="relationship" value={editedCharacter.relationship} onChange={handleChange} /></p>
        <p>History: <input type="text" name="history" value={editedCharacter.history} onChange={handleChange} /></p>
        <p>Images: <input type="text" name="imageUrl" value={editedCharacter.imageUrl} onChange={handleChange} /></p>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCharacter;
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function EditCharacter({ character, handleEditCharacter, onEditSuccess }) {
  const [editedCharacter, setEditedCharacter] = useState(character);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter(prevCharacter => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleEditCharacter(character._id, editedCharacter);
    
    // Call the onEditSuccess callback to redirect
    if (onEditSuccess) {
      onEditSuccess();
    }
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <p>Name: <input type="text" name="name" value={editedCharacter.name} onChange={handleChange} /></p>
        <p>Tags: <input type="text" name="tags" value={editedCharacter.tags} onChange={handleChange} /></p>
        <p>Personality: <input type="text" name="personality" value={editedCharacter.personality} onChange={handleChange} /></p>
        <p>Relationships: <input type="text" name="relationships" value={editedCharacter.relationships} onChange={handleChange} /></p>
        <p>History: <input type="text" name="history" value={editedCharacter.history} onChange={handleChange} /></p>
        <p>Images: <input type="text" name="imageUrl" value={editedCharacter.imageUrl} onChange={handleChange} /></p>
        
        <button type="submit">Save Changes</button>

        {/* I put <Link to='/characters'></Link> and it didn't worked out */}
      </form>
    </div>
  );
}

export default EditCharacter;
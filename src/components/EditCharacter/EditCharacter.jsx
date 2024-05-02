import React, { useState } from 'react';
// import *  from '../../utilities/characters-api'
import CreateCharacter from '../CreateCharacter/CreateCharacter';

function EditCharacter() {
  return (
<div className="Edit">
<form onSubmit={handleSubmit}>
    <p>Name:  </p>
    <p>Tags: </p>
    <p>Personality: </p>
    <p>Relationships: </p>
    <p>History: </p>
    <p>Images: </p>
    
<button type="submit">Create your own!</button></form>
</div>
  )}

export default EditCharacter


// param -> id -> get the info -> populate -> send back as a value
// import React from 'react'

// function CreateArtist({userId}) {
//         const [artist, setArt] = useState({
//             name: '',
//             tags: [''],
//             personality: '',

//             imageUrl: '',
//             user: userId 
//         });
    
//         function handleChange(e) {
//             const { name, value } = e.target;
//             setCharacter(prevCharacter => ({
//                 ...prevCharacter,
//                 [name]: value,
//             }));
//         }
    
//         function handleSubmit(e) {
//             e.preventDefault();
//         }
    
//         return (
//             <div className="ficha">
//                 <form onSubmit={handleSubmit}>
//                     <p>Name: <input type="text" name="name" value={character.name} onChange={handleChange} /></p>
//                     <p>Tags: <input type="text" value={character.tags} name="tags" className="tags-input" onChange={handleChange}/></p>
//                     <p>Personality: <input type="text" name="personality" value={character.personality} onChange={handleChange} /></p>
//                     <p>Relationships: <input type="text" name='realtionship' value={character.relationship} onChange={handleChange}/></p>
//                     <p>History: <input type="text" name="history" value={character.history} onChange={handleChange} /></p>
//                     <p>Images: <input type="text" placeholder="Link" name="imageUrl" value={character.imageUrl} onChange={handleChange} /></p>
                    
//                     <button type="submit">Create your own!</button>
//                 </form>
//             </div>
//         );
//     }
    
//     export default CreateCharacter; 

// export default CreateArtist

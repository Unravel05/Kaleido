import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as artist from '../../utilities/artists-api'
import EditArtist from '../../components/EditArtist/EditArtist'

function EditArtistPage({handleEditArtist}) {
    const { artistId } = useParams();
    const [ artistData, setArtistData] = React.useState(null);
    
  
    React.useEffect(() => {
      artist.getArtistById(artistId)
        .then(data => setArtistData(data))
      fetchArtist();
  }, [artistId]);
  
    const fetchArtist = async () => {
      try {
          const fetchedArtist = await artist.getArtistById(artistId);
          setArtistData(fetchedArtist);
      } catch (error) {
          console.error('Error fetching artist details:', error);
      }
  };
  
    const handleSave = async (updatedArtist) => {
      try {
          await artist.editArtist(artistId, updatedArtist);
          setArtistData(updatedArtist); 
      } catch (error) {
          console.error('Error updating artist:', error);
      }
  };

  return (
    <div>
        <h1>Edit your art!</h1>
        {artistData && <EditArtist artist={artistData} handleEditArtist={handleEditArtist}/>}
    </div>
  )

}
export default EditArtistPage

import React, { useState, useEffect } from "react";
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter';
import * as character from '../../utilities/characters-api';
import { Link } from "react-router-dom";
import EditCharacter from "../../components/EditCharacter/EditCharacter";
import Button from '@mui/material/Button';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import * as userService from '../../utilities/users-service';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CharactersPage({ characters, setCharacters, handleEditCharacter }) {
    const [characterData, setCharacterData] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [expandedPersonalityId, setExpandedPersonalityId] = useState(null);
    const [expandedHistoryId, setExpandedHistoryId] = useState(null);
    const [user, setUser] = useState(userService.getUser());

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const data = await character.getCharacter();
            setCharacters(data);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const handleSubmitCharacter = async (newCharacter) => {
        try {
            await character.saveCharacter(newCharacter);
            setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
            setShowCreateForm(false); // Hide the form after submission
        } catch (error) {
            console.error('Error saving character:', error);
        }
    };

    const deleteCharacter = async (characterId) => {
        console.log(characterId)
        try {
            await character.deleteCharacter(characterId);
            setCharacters(prevCharacters => prevCharacters.filter(character => character._id !== characterId));
        } catch (error) {
            console.error('Error deleting character:', error);
        }
    };

    const handleSave = (updatedCharacter) => {
        setCharacterData(updatedCharacter);
    };

    const handleEditSuccess = () => {
        // Redirect to CharactersPage
        window.location.reload(); // Refresh the page
    };

    const handleExpandPersonalityClick = (cardId) => {
        setExpandedPersonalityId(expandedPersonalityId === cardId ? null : cardId);
    };

    const handleExpandHistoryClick = (cardId) => {
        setExpandedHistoryId(expandedHistoryId === cardId ? null : cardId);
    };

    const StyledCard = styled(Card)(({ theme }) => ({
        backgroundColor: '#B28D62',
        width: '280px',
        alignContent: 'center',
        margin: '1% 1% 1% 0%',
    }));

    const StyledIconButton = styled(IconButton)(({ theme }) => ({
        color: '#5E3914',
    }));

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div>
            <h1>Characters!</h1>

            {user && (
                <Button onClick={() => setShowCreateForm(!showCreateForm)} sx={{ backgroundColor: '#5E3914', color: 'white' }}>
                    <AddCircleIcon /> Add Character
                </Button>
            )}
            {showCreateForm && <CreateCharacter handleSubmitCharacter={handleSubmitCharacter} handleEditCharacter={handleEditCharacter} onEditSuccess={() => window.location.href = '/characters'} />}            <Slider {...settings}>
                {characters.map((character, index) => (
                    <div key={character._id}>
                        <StyledCard>
                           {user && <CardHeader
                                action={
                                    user._id === character.user._id &&
                                    <Link to={`/characters/edit/${character._id}`}>
                                        <StyledIconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </StyledIconButton>
                                    </Link>
                                }
                                title={character.name}
                                subheader={character.user.name}
                            />}
                            <CardMedia
                                component="img"
                                image={character.imageUrl}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">{character.tags}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                {user && user._id === character.user._id &&
                                    <StyledIconButton onClick={() => deleteCharacter(character._id)} aria-label="delete">
                                        <DeleteForeverRoundedIcon />
                                    </StyledIconButton>
                                }
                                <Link to={character.sourceUrl} target="_blank" rel="noopener noreferrer">
                                    <StyledIconButton aria-label="share">
                                        <ShareIcon />
                                    </StyledIconButton>
                                </Link>
                                <StyledIconButton
                                    onClick={() => handleExpandPersonalityClick(character._id)}
                                    aria-expanded={expandedPersonalityId === character._id}
                                    aria-label="show personality"
                                >
                                    <PersonIcon />
                                </StyledIconButton>
                                <StyledIconButton
                                    onClick={() => handleExpandHistoryClick(character._id)}
                                    aria-expanded={expandedHistoryId === character._id}
                                    aria-label="show history"
                                >
                                    <HistoryEduIcon />
                                </StyledIconButton>
                            </CardActions>
                            <Collapse in={expandedPersonalityId === character._id} timeout="auto" unmountOnExit>
                                <CardContent>  
                                    <Typography paragraph>Personality:</Typography>
                                    <Typography paragraph>{character.personality}</Typography>
                                </CardContent>
                            </Collapse>
                            <Collapse in={expandedHistoryId === character._id} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>History:</Typography>
                                    <Typography paragraph>{character.history}</Typography>
                                </CardContent>
                            </Collapse>
                        </StyledCard>
                        {characterData && <EditCharacter character={characterData} handleEditCharacter={handleEditCharacter} />}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CharactersPage;

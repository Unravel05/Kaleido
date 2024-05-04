import React, { useState, useEffect } from "react";
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter'
import * as character from '../../utilities/characters-api'
import { Link } from "react-router-dom";
import EditCharacter from "../../components/EditCharacter/EditCharacter";
import Button from '@mui/material/Button';
import { brown } from "@mui/material/colors";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

//.___________Card imports.______________

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//____________Grid______________

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


function CharactersPage({ characters, setCharacters, handleEditCharacter }) {
    const [characterData, setCharacterData] = React.useState(null)
    const color = brown[500];

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



    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      

    return (
        <div>
    <h1>Characters!</h1>
    <CreateCharacter handleSubmitCharacter={handleSubmitCharacter} handleEditCharacter={handleEditCharacter} />
    <Grid container spacing={3} padding={1}>
        {characters.map((character, index) => (
            <Grid item key={character._id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        action={
                            <Link to={`/characters/edit/${character._id}`}>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            </Link>
                        }
                        title={character.name}
                        subheader={character.tags}
                    />
                    <CardMedia
                        component="img"
                        image={character.imageUrl}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">{character.relationships}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton onClick={() => deleteCharacter(character._id)} aria-label="add to favorites">
                            <DeleteForeverRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Personality:</Typography>
                            <Typography paragraph>{character.personality}</Typography>
                            <Typography paragraph>History:</Typography>
                            <Typography paragraph>{character.history}</Typography>
                            <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                
                {characterData && <EditCharacter character={characterData} handleEditCharacter={handleEditCharacter} />}

            </Grid>
        ))}
    </Grid>
</div>

        
    );
}

export default CharactersPage

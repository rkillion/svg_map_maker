import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorldCard from "../features/worlds/WorldCard";
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormDialog from "./FormDialog";
import { useState } from "react";

export default function UniversePage () {
    const { id } = useParams();
    const universes = useSelector(state=>state.universes.entities)
    const universe = universes.find(universe=>universe.id===parseInt(id))

    const [formDialogueOpen, setFormDialogueOpen] = useState(false);

    const handleFormOpen = () => {
        setFormDialogueOpen(true);
    };

    if (!universe) {
        return (
            <DisplayBox>
                {`Universe ${id} not found.`}
            </DisplayBox>
        )
    }

    return (
        <DisplayBox>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{universe.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem button onClick={handleFormOpen}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="New World" />
                        </ListItem>
                    </List>
                    <Typography>
                        {/* A Description could go here */}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <CardArea>
                {universe.worlds.map(world=>(
                    <WorldCard 
                        key={world.id}
                        world={world}
                    />
                ))}
            </CardArea>
            
            Images courtesy of Pixabey
            <FormDialog 
                formDialogueOpen={formDialogueOpen}
                setFormDialogueOpen={setFormDialogueOpen}
                formDialogueObject={{
                    item: "world"
                }}
            />
        </DisplayBox>
    )
}

const DisplayBox = styled.div`
    display: flex;
    width: auto;
    padding: 120px;
    flex-direction: column;
    align-items: stretch;
`

const CardArea = styled.div`
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`
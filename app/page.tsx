import { Button , Box, ButtonGroup, Typography} from "@mui/material";
import { DynamicWidget } from "../lib/dynamic";
import ButtonAppBar from "./components/navbar";
import Image from 'next/image';
import card from './images/SVG-cards-1.3/10_of_clubs.svg';


export default function Main() {
  return (
    <div>
      <ButtonAppBar />
    <div className=" bg-gradient-to-b from-blue-900 to-black  text-white">
    
      <Box sx={{display: 'flex', padding: 2}}>
          <Box sx={{ display: 'flex', flexGrow:  4, alignItems: 'flex-start', justifyContent : 'center'}}>
            <ButtonGroup variant="contained" aria-label="Basic button group" >
                <Button>Create Game</Button>
                <Button>Join Game</Button>
                <Button>Start Game</Button>
                <Button>Start Over</Button>
            </ButtonGroup>
          </Box>
      </Box>

      <Box  sx={{display: 'inline-flex', padding: 6, m: 2 ,flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h5" component="h2" display='flex'>
            Your Card
        </Typography>
        <Box display='flex'>
          <Image src={card}
          width={100}
          height={100}
          alt="Picture of a Card"/>
        </Box>

        <Box display='flex'>
          <Button variant="contained">Draw</Button>
        </Box>
        
      </Box>
      
    </div>
    </div>
  );
}

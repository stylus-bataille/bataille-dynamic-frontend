'use client';
import { Button , Box, ButtonGroup, Typography} from "@mui/material";
import { DynamicWidget } from "../lib/dynamic";
import ButtonAppBar from "./components/navbar";
import Image from 'next/image';
import BoxCard from "./components/boxcard";


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

      
      <BoxCard cardName="Your Card" buttonName="Draw" cardNumber={0} onButtonClick={() => {}} />


      <BoxCard cardName="Opponent's Card" buttonName="Draw" cardNumber={48} onButtonClick={() => {}} />
      
    </div>
    </div>
  );
}

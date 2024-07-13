'use client';
import * as React from 'react';
import { Button , Box, ButtonGroup, Typography} from "@mui/material";
import { DynamicWidget } from "../lib/dynamic";
import ButtonAppBar from "./components/navbar";
import Image from 'next/image';
import BoxCard from "./components/boxcard";


export default function Main() {
  const [GameID, setGameID] = React.useState(BigInt(0));
  
  console.log("current gameID", GameID);
  return (
    <div>
      <ButtonAppBar GameID={GameID} setGameID={setGameID}/>
    <div className=" bg-gradient-to-b from-pink-400 to-rose-900  text-white">
    
      

      <Box sx={{display: 'flex', padding: 2, alignItems: 'flex-start', justifyContent : 'center', height: "100vh"}}>
          <BoxCard cardName="Your Card" buttonName="Draw" cardNumber={0} winner={true} gameID={GameID} onButtonClick={() => {}} />

          <BoxCard cardName="Opponent's Card" buttonName="Draw" cardNumber={48} buttonDisabled={true} onButtonClick={() => {}} />

          <BoxCard cardName="Opponent's Card" buttonName="Draw" cardNumber={48} buttonDisabled={true} onButtonClick={() => {}} />

      </Box>
     
      <Box sx={{display: 'flex', padding: 2, alignItems: 'flex-start', justifyContent : 'center'}}>
          <Typography variant='h6' margin={1} color="#808080">
            Made using 
          </Typography>
          <Image src="/logo/stylus_logo.png" alt="stylus" width={50} height={50} />
          <Typography variant='h6' margin={1} color="#808080">
            and
          </Typography>
          <Image src="/logo/logo.png" alt="dynamic" width={50} height={50} />
      </Box>
    </div>

    </div>
  );
}

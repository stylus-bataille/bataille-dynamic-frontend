'use client';
import * as React from 'react';
import { Button , Box, ButtonGroup, Typography} from "@mui/material";
import { DynamicWidget } from "../lib/dynamic";
import ButtonAppBar from "./components/navbar";
import Image from 'next/image';
import BoxCard from "./components/boxcard";
import { 
  fetchBeacon, 
  fetchBeaconByTime, 
  HttpChainClient, 
  watch, 
  HttpCachingChain, 
  FastestNodeClient, 
  MultiBeaconNode } from 'drand-client'
import {useReadContract} from 'wagmi';
import { abi, ContractAddress } from "./abi/bataille_abi";
import { drandFetch } from './components/drand';

export default function Main() {
  //game Id state to be passed to the Children component
  const [GameID, setGameID] = React.useState(BigInt(0));
  const [hasGameStarted, setHasGameStarted] = React.useState(false);

  console.log("current gameID", GameID);

  return (
    <div>
      <ButtonAppBar GameID={GameID} setGameID={setGameID} hasGameStarted={hasGameStarted} setHasGameStarted={setHasGameStarted}/>
    <div className=" bg-gradient-to-b from-pink-400 to-rose-900  text-white">
    
      

      <Box sx={{display: 'flex', padding: 2, alignItems: 'flex-start', justifyContent : 'center', height: "100vh"}}>
          <BoxCard cardName="Your Card" buttonName="Draw" cardNumber={0} winner={true} gameID={GameID} />

          <BoxCard cardName="Opponent's Card" buttonName="Draw" cardNumber={48} buttonDisabled={true} gameID={GameID}  />

          <BoxCard cardName="Opponent's Card" buttonName="Draw" cardNumber={48} buttonDisabled={true} gameID={GameID}  />

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

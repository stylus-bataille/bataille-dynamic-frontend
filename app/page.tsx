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
import {useAccount, useReadContract} from 'wagmi';
import { abi, ContractAddress } from "./abi/bataille_abi";
import { drandFetch } from './components/drand';
import { useEffect } from 'react';
import { type UseReadContractReturnType } from 'wagmi'




export default function Main() {
  //game Id state to be passed to the Children component
  const [GameID, setGameID] = React.useState(BigInt(0));
  const [hasGameStarted, setHasGameStarted] = React.useState(false);
  const [cardNumber, setCardNumber] = React.useState(1);
  const {address} = useAccount();


    console.log("current gameID", GameID);

    const cardNumberDrawn = useReadContract({
      abi,
      address: ContractAddress,
      functionName: 'latestCard',
      account: address,
      args: [],
    })


  useEffect(() => {
      setCardNumber(cardNumberDrawn.data);
      console.log("cardsDrawn", cardNumberDrawn.data);
  }, [cardNumberDrawn.data]); 

  return (
    
    <div>
      <ButtonAppBar GameID={GameID} setGameID={setGameID} hasGameStarted={hasGameStarted} setHasGameStarted={setHasGameStarted}/>
    <div className=" bg-gradient-to-b from-pink-400 to-rose-900  text-white">
      <Typography variant='h6'  color="#781581" align="center">
        Draw an Ace to win!
      </Typography>
      
      
      <Box sx={{display: 'flex', padding: 2, alignItems: 'flex-start', justifyContent : 'center', height: "75vh"}}>
          <BoxCard cardName="Current Card" buttonName="Draw" cardNumber={cardNumber} gameID={GameID} buttonDisabled={true}/>
      </Box>

      <Typography variant='h6'  color="#E59FEB" align="center">
        Warning: Due to some Unknown Problems, Card Update Might take a while (arround 1 to 2 minutes)
      </Typography>
     
      <Box sx={{display: 'flex', padding: 2, alignItems: 'flex-start', justifyContent : 'center'}}>
          <Typography variant='h6' margin={1} color="#E59FEB">
            Made using 
          </Typography>
          <Image src="/logo/stylus_logo.png" alt="stylus" width={50} height={50} />
          <Typography variant='h6' margin={1} color="#E59FEB">
            and
          </Typography>
          <Image src="/logo/logo.png" alt="dynamic" width={50} height={50} />
      </Box>
    </div>
        
    </div>
  );
}

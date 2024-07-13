import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, ButtonGroup, colors} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import Image from 'next/image';
import { grey } from '@mui/material/colors';
import { useSimulateContract, useAccount, useWriteContract, useWaitForTransactionReceipt, createConfig } from 'wagmi'
import { abi } from "../abi/bataille_abi";
import {config} from "../../lib/wagmi";

const CreateGame = async () => {
  const { data, error, isPending, isError, writeContract } = useWriteContract();

  await writeContract({
    abi,
    address: '0xd5737bbe28a697f22cf2595c949a5c5a7e0ebb64',
    functionName: 'createGame',
    args: [],

  });

  const {isLoading: isConfirmed, isSuccess: isConfirmedSuccess} = useWaitForTransactionReceipt({hash: data});

  return(
    <div>
      <Button sx={{backgroundColor: '#753D7B'}}  onClick={CreateGame}>
          Create Game
      </Button>
    </div>
  )
}


export default function ButtonAppBar() {
  //wagmi config
  const { chain, address } = useAccount();

  const { data: hash, error, isPending, isError, writeContract } = useWriteContract();

  const createGame = () => {
    writeContract({
      abi,
      address: '0xD5737Bbe28a697f22Cf2595C949a5C5a7e0ebb64',
      functionName: 'createGame',
      account: address,
      args: [],
    });
  }

  

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash, 
  });


  console.log(isConfirmed);

  

  return (
    <Box sx={{ flexGrow: 1 , backgroundColor : '#000000'}} bgcolor="#000000">
      <AppBar position="static">
        <Toolbar sx={{backgroundColor : '#D4A1D9' }}>
          

          
          <Typography variant="h4" component="div" >
            Bataille
          </Typography>
          

          <Box sx={{ display: 'flex', flexGrow:  1, alignItems: 'flex-start', justifyContent : 'center'}}>
            <ButtonGroup variant="contained" aria-label="Basic button group" color='secondary'>
                <Button sx={{backgroundColor: '#753DA0'}} onClick={createGame}>Create Game</Button>
                <Button sx={{backgroundColor: '#753DA0'}}>Join Game</Button>
                <Button sx={{backgroundColor: '#753DCD'}}>Start Game</Button>
                <Button sx={{backgroundColor: '#753DFE'}}>Start Over</Button>
            </ButtonGroup>
          </Box>
          <DynamicWidget />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, ButtonGroup, Modal, TextField} from '@mui/material';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import Image from 'next/image';
import { grey } from '@mui/material/colors';
import { useSimulateContract, useAccount, useWriteContract, useWaitForTransactionReceipt, createConfig } from 'wagmi'
import { abi, ContractAddress } from "../abi/bataille_abi";
import {config} from "../../lib/wagmi";
import { parse } from 'path';
import {StyledInputRoot, StyledInputElement, StyledButton} from './numperInputStyle';

/*
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
  */
const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#A181A4',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center',
};



export default function ButtonAppBar() {
  //state of component
  const [GameID, setGameID] = React.useState(BigInt(0));
  const [open, setOpen] = React.useState(false); //modal state

  //modal fonctions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  //wagmi config
  const { chain, address } = useAccount();

  const { data: hash, error, isPending, isError, writeContract } = useWriteContract();

  const createGame = () => {
    writeContract({
      abi,
      address: ContractAddress,
      functionName: 'createGame',
      account: address,
      args: [],
    });
  }

  const joinGame = () => {
    writeContract({
      abi,
      address: ContractAddress,
      functionName: 'joinGame',
      account: address,
      args: [GameID],
    });
  }

  

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash, 
  });


  console.log("Current Game ID", GameID);

  

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

                <Button sx={{backgroundColor: '#753DA0'}} onClick={handleOpen}>Join Game</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={ModalStyle}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" paddingBottom={2}>
                        Please Enter Game ID
                      </Typography>
                      <NumberInput
                          aria-label="Demo number input"
                          placeholder="Type a number…"
                          value={parseInt(GameID.toString())}
                          onChange={(event, val) => setGameID(BigInt(val))}
                          slots={{
                            root: StyledInputRoot,
                            input: StyledInputElement,
                            incrementButton: StyledButton,
                            decrementButton: StyledButton,
                          }}
                        />
                      <Button onClick={joinGame} sx={{marginTop: 2}}>Join Game</Button>
                    </Box>
                </Modal>


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

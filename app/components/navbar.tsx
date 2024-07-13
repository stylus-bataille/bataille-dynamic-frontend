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

/*

const SimulateStartGame = async () => {
  const { request } = await simulateContract(config, {
    abi,
    address: 'ContractAddress',
    functionName: 'startGame',
    args: [GameID],
  })
  const hash = await writeContract(config, request)

}
*/



export default function ButtonAppBar({GameID, setGameID, hasGameStarted, setHasGameStarted}) {
  //state of component
  const [open1, setOpen1] = React.useState(false); //modal1 state
  const [open2, setOpen2] = React.useState(false); //modal2 state


  //modal fonctions
  //modal1 = join game
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);



  //wagmi config
  const { chain, address } = useAccount();

  const { data: hash, error, isPending, isError, writeContract } = useWriteContract();
  
  const { data: simulateData, failureReason } = useSimulateContract({
    abi,
    address: ContractAddress,
    functionName: 'startGame',
    args: [GameID],
  });

  console.log("simulated data", simulateData);
  console.log("failure reason", failureReason);



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

  const startGame = () => {
    writeContract({
      abi,
      address: ContractAddress,
      functionName: 'startGame',
      account: address,
      args: [GameID],
    });

    setHasGameStarted(true);
  }

  

  

  

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash, 
  });
  

  return (
    <Box sx={{ flexGrow: 1 , backgroundColor : '#000000'}} bgcolor="#000000">
      <AppBar position="static">
        <Toolbar sx={{backgroundColor : '#D4A1D9' }}>
          

          
          <Typography variant="h4" component="div" >
            Bataille
          </Typography>
          

          <Box sx={{ display: 'flex', flexGrow:  1, alignItems: 'flex-start', justifyContent : 'center'}}>
            <ButtonGroup variant="contained" aria-label="Basic button group" color='secondary'>
                <Button sx={{backgroundColor: '#753DA0'}} onClick={createGame} disabled={hasGameStarted}>Create Game</Button>

                <Button sx={{backgroundColor: '#753DA0'}} onClick={handleOpen1} disabled={hasGameStarted}>Join Game</Button>
                <Modal
                    open={open1}
                    onClose={handleClose1}
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


                <Button sx={{backgroundColor: '#753DCD'}} onClick={handleOpen2}>Start Game</Button>
                <Modal
                    open={open2}
                    onClose={handleClose2}
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
                      <Button onClick={startGame} sx={{marginTop: 2}}>Start Game</Button>
                    </Box>
                </Modal>


                <Button sx={{backgroundColor: '#753DFE'}}>Start Over</Button>
            </ButtonGroup>
          </Box>
          <DynamicWidget />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

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
  const [drandHash, setDrandHash] = React.useState('');
  const [hasGameStarted, setHasGameStarted] = React.useState(false);

  //read Drand Number from contract (verified with the help of Stylus)
  const DrandNumber = useReadContract({
    abi,
    address: ContractAddress,
    functionName: 'nextDrandRound',
    args: [GameID],
  })

  console.log("current DrandNumber", DrandNumber.data);

  //drand logic
  const chainHash = '52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971' // (hex encoded)
  const publicKey = '83cf0f2896adee7eb8b5f01fcad3912212c437e0073e911fb90022d3e760183c8c4b450b6a0a6c3ac6a5776a2d1064510d1fec758c921cc22b0e17e63aaf4bcb5ed66304de9cf809bd274ca73bab4af5a6e9c76a4bc09e76eae8991ef5ece45a' // (hex encoded)

    //drand fetch function
  const drandFetch = async(DrandNumber) => {
   
    const options = {
        disableBeaconVerification: true, // `true` disables checking of signatures on beacons - faster but insecure!!!
        noCache: false, // `true` disables caching when retrieving beacons for some providers
        chainVerificationParams: { chainHash, publicKey }  // these are optional, but recommended! They are compared for parity against the `/info` output of a given node
    }

    // if you want to connect to a single chain to grab the latest beacon you can simply do the following
    // note: if you want to access e.g. quicknet you must use 'https://api.drand.sh/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971'
    // passing the chainHash in the `chainVerificationParams` will not fill in the path for you (unless using `MultiBeaconNode`)
    const chain = new HttpCachingChain('https://api.drand.sh/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971', options)
    const client = new HttpChainClient(chain, options)
    const RightBeacon = await fetchBeacon(client, DrandNumber)
    console.log("Right Beacon", RightBeacon.signature);
    setDrandHash(RightBeacon.signature);

   
    // if you're happy to get randomness from many APIs and automatically use the fastest
    // you can construct a `FastestNodeClient` with multiple URLs
    // note: the randomness beacons are cryptographically verifiable, so as long as you fill
    // in the `chainVerificationParams` in the options, you don't need to worry about malicious 
    // providers sending you fake randomness!
    const urls = [
        'https://api.drand.sh/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971',
        'https://drand.cloudflare.com/52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971'
        // ...
    ]
    const fastestNodeClient = new FastestNodeClient(urls, options)
    // don't forget to start the client, or it won't periodically optimise for the fastest node!
    fastestNodeClient.start()
    
    // don't forget to stop the speed testing, or you may leak a `setInterval` call!
    fastestNodeClient.stop()

    // you can also use the `watch` async generator to watch the latest randomness automatically!
    // use an abort controller to stop it
    const abortController = new AbortController()
    for await (const beacon of watch(client, abortController)) {
        if (beacon.round === 10) {
            abortController.abort('round 10 reached - listening stopped')
        }
    }
  }

 
  
  
  console.log("current drandHash", drandHash);
  console.log("current gameID", GameID);

  return (
    <div>
      <ButtonAppBar GameID={GameID} setGameID={setGameID} hasGameStarted={hasGameStarted} setHasGameStarted={setHasGameStarted}/>
    <div className=" bg-gradient-to-b from-pink-400 to-rose-900  text-white">
    
      <Button onClick={() => drandFetch(DrandNumber.data).catch((error) => console.error(error))} variant="contained" color='secondary' sx={{marginY: 3}}>
        fetch Drand Number
      </Button>

      <Box sx={{display: 'flex', padding: 2, alignItems: 'flex-start', justifyContent : 'center', height: "100vh"}}>
          <BoxCard cardName="Your Card" buttonName="Draw" cardNumber={0} winner={true} gameID={GameID} onButtonClick={() => drandFetch(DrandNumber.data).catch((error) => console.error(error))} />

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

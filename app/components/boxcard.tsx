'use client';
import React, { useEffect } from 'react';
import { Box, Button, Typography, Alert} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { simulateContract, writeContract, readContract } from '@wagmi/core'

import { useAccount, useWriteContract, useReadContract, useSimulateContract } from 'wagmi';
import { abi, ContractAddress } from "../abi/bataille_abi";
import { 
    fetchBeacon, 
    fetchBeaconByTime, 
    HttpChainClient, 
    watch, 
    HttpCachingChain, 
    FastestNodeClient, 
    MultiBeaconNode } from 'drand-client';
    import { config } from "@/lib/wagmi";


// Define the base path for the card images
const BASE_CARD_PATH = '/images/SVG-cards-1.3/';

// Assuming you have 52 cards named from 1.svg to 52.svg
type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 ;

// Define a type that maps a number to a card's file path
type CardPathMapping = {
    [K in CardNumber]: string;
} & { [key: number]: string };

// Example of creating an object that maps numbers to card paths
const cardPathMapping: CardPathMapping = {
    0: `${BASE_CARD_PATH}ace_of_clubs.svg`,
    1: `${BASE_CARD_PATH}2_of_clubs.svg`,
    2: `${BASE_CARD_PATH}3_of_clubs.svg`,
    3: `${BASE_CARD_PATH}4_of_clubs.svg`,
    4: `${BASE_CARD_PATH}5_of_clubs.svg`,
    5: `${BASE_CARD_PATH}6_of_clubs.svg`,
    6: `${BASE_CARD_PATH}7_of_clubs.svg`,
    7: `${BASE_CARD_PATH}8_of_clubs.svg`,
    8: `${BASE_CARD_PATH}9_of_clubs.svg`,
    9: `${BASE_CARD_PATH}10_of_clubs.svg`,
    10: `${BASE_CARD_PATH}jack_of_clubs.svg`,
    11: `${BASE_CARD_PATH}queen_of_clubs.svg`,
    12: `${BASE_CARD_PATH}king_of_clubs.svg`,
    13: `${BASE_CARD_PATH}ace_of_diamonds.svg`,
    14: `${BASE_CARD_PATH}2_of_diamonds.svg`,
    15: `${BASE_CARD_PATH}3_of_diamonds.svg`,
    16: `${BASE_CARD_PATH}4_of_diamonds.svg`,
    17: `${BASE_CARD_PATH}5_of_diamonds.svg`,
    18: `${BASE_CARD_PATH}6_of_diamonds.svg`,
    19: `${BASE_CARD_PATH}7_of_diamonds.svg`,
    20: `${BASE_CARD_PATH}8_of_diamonds.svg`,
    21: `${BASE_CARD_PATH}9_of_diamonds.svg`,
    22: `${BASE_CARD_PATH}10_of_diamonds.svg`,
    23: `${BASE_CARD_PATH}jack_of_diamonds.svg`,
    24: `${BASE_CARD_PATH}queen_of_diamonds.svg`,
    25: `${BASE_CARD_PATH}king_of_diamonds.svg`,
    26: `${BASE_CARD_PATH}ace_of_hearts.svg`,
    27: `${BASE_CARD_PATH}2_of_hearts.svg`,
    28: `${BASE_CARD_PATH}3_of_hearts.svg`,
    29: `${BASE_CARD_PATH}4_of_hearts.svg`,
    30: `${BASE_CARD_PATH}5_of_hearts.svg`,
    31: `${BASE_CARD_PATH}6_of_hearts.svg`,
    32: `${BASE_CARD_PATH}7_of_hearts.svg`,
    33: `${BASE_CARD_PATH}8_of_hearts.svg`,
    34: `${BASE_CARD_PATH}9_of_hearts.svg`,
    35: `${BASE_CARD_PATH}10_of_hearts.svg`,
    36: `${BASE_CARD_PATH}jack_of_hearts.svg`,
    37: `${BASE_CARD_PATH}queen_of_hearts.svg`,
    38: `${BASE_CARD_PATH}king_of_hearts.svg`,
    39: `${BASE_CARD_PATH}ace_of_spades.svg`,
    40: `${BASE_CARD_PATH}2_of_spades.svg`,
    41: `${BASE_CARD_PATH}3_of_spades.svg`,
    42: `${BASE_CARD_PATH}4_of_spades.svg`,
    43: `${BASE_CARD_PATH}5_of_spades.svg`,
    44: `${BASE_CARD_PATH}6_of_spades.svg`,
    45: `${BASE_CARD_PATH}7_of_spades.svg`,
    46: `${BASE_CARD_PATH}8_of_spades.svg`,
    47: `${BASE_CARD_PATH}9_of_spades.svg`,
    48: `${BASE_CARD_PATH}10_of_spades.svg`,
    49: `${BASE_CARD_PATH}jack_of_spades.svg`,
    50: `${BASE_CARD_PATH}queen_of_spades.svg`,
    51: `${BASE_CARD_PATH}king_of_spades.svg`,
  };

const ImageDisplay = ({ number }: { number: number }) => {
    const imageSrc = cardPathMapping[number];
  
    if (!imageSrc) {
      return <div>Image not found</div>;
    }
  
    return (
      <div>
        <Image
          src={imageSrc}
          alt={`Image ${number}`}
          width={100} // specify width
          height={100} // specify height
        />
      </div>
    );
  };

ImageDisplay.propTypes = {
    number: PropTypes.number.isRequired,
};

interface BoxCardProps {
    cardName: string;
    buttonName: string;
    buttonDisabled?: boolean;
    cardNumber: number;
    gameID: bigint;
    
}

const BoxCard: React.FC<BoxCardProps> = ({ cardName, buttonName,buttonDisabled,cardNumber,gameID }) => {
    const [drandHash, setDrandHash] = React.useState('');

    //wagmi hooks
    const { chain, address } = useAccount();
    const { data: hash, error, isPending, isError, writeContract } = useWriteContract();

    //read Drand Number from contract (verified with the help of Stylus)
    const DrandNumber = useReadContract({
        abi,
        address: ContractAddress,
        functionName: 'nextDrandRound',
        args: [gameID],
    })
    useEffect(() => {
        console.log("current DrandNumber", DrandNumber.data);
    }, [DrandNumber.data]);

    //drand logic
    const chainHash = '52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971' // (hex encoded)
    const publicKey = '83cf0f2896adee7eb8b5f01fcad3912212c437e0073e911fb90022d3e760183c8c4b450b6a0a6c3ac6a5776a2d1064510d1fec758c921cc22b0e17e63aaf4bcb5ed66304de9cf809bd274ca73bab4af5a6e9c76a4bc09e76eae8991ef5ece45a' // (hex encoded)

    //drand fetch function
    const drandFetch = async (DrandNumber: any) => {
   
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
            setDrandHash(RightBeacon.signature);

            if (RightBeacon.signature != '') {
                console.log("Right Beacon bytes", (RightBeacon.signature));
                
                writeContract({
                    abi,
                    address: ContractAddress,
                    functionName: 'draw',
                    account: address,
                    args: [
                    gameID,
                    `0x${(RightBeacon.signature)}`,
                    ],
                });
            }

        
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


    return(
       
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, m: 1, border: '1px solid #ccc', borderRadius: '4px'}}>
                    <Button onClick={() => drandFetch(DrandNumber.data).catch((error) => console.error(error))} variant="contained" color='secondary' sx={{marginY: 3}} disabled={buttonDisabled}>
                        fetch Drand Number
                    </Button>
                    
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                        {cardName}
                    </Typography>

                    <ImageDisplay number={cardNumber} />

                    <Button variant="contained" color='secondary' onClick={() => drandFetch(DrandNumber.data).catch((error) => console.error(error))} sx={{marginY: 3}} >
                        {buttonName}
                    </Button>

                    {(cardNumber % 13) == 0 ? 
                    <Alert icon={<EmojiEventsIcon fontSize='medium'/>} severity="success">
                        You won the game! 
                    </Alert>: 
                    <Alert icon={<DangerousIcon fontSize="medium" />} severity="error">
                        You lost this time
                    </Alert>}
                </Box>
           
    )
};

export default BoxCard;
'use client';
import React from 'react';
import { Box, Button, Typography, Alert} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Image from 'next/image';
import PropTypes from 'prop-types';


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
    cardNumber: CardNumber;
    buttonDisabled?: boolean;
    winner?: boolean;
    onButtonClick: () => void;
}

const BoxCard: React.FC<BoxCardProps> = ({ cardName, buttonName, cardNumber,buttonDisabled,winner, onButtonClick }) => {
    
    const imagePath = cardPathMapping[cardNumber]; // Assuming cardPathMapping is the mapping object
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, m: 1, border: '1px solid #ccc', borderRadius: '4px'}}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                {cardName}
            </Typography>

            <ImageDisplay number={cardNumber} />

            <Button variant="contained" color='secondary' onClick={onButtonClick} sx={{marginY: 3}} disabled={buttonDisabled}>
                {buttonName}
            </Button>

            {winner ? 
            <Alert icon={<EmojiEventsIcon fontSize='medium'/>} severity="success">
                You won the round! 
            </Alert>: 
            <Alert icon={<DangerousIcon fontSize="medium" />} severity="error">
                You lost this round
            </Alert>}
        </Box>
  );
};

export default BoxCard;
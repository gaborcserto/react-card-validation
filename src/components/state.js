import { useState, createContext } from 'react';

export const DEFAULT_CARD_STATE = {
	cardNumber: '**** **** **** ****',
	cardHolder: 'FULL NAME',
	cardMonth: '',
	cardYear: '',
	cardCVC: '',
	isFlipped: false,
	currentFocusedElm: null,
};

export const cardContext = createContext(DEFAULT_CARD_STATE);

export const useCard = () => {
	const [cardNumber, setCardNumber] = useState(DEFAULT_CARD_STATE.cardNumber);
	const [cardHolder, setCardHolder] = useState(DEFAULT_CARD_STATE.cardHolder);
	const [cardMonth, setCardMonth] = useState(DEFAULT_CARD_STATE.cardMonth);
	const [cardYear, setCardYear] = useState(DEFAULT_CARD_STATE.cardYear);
	const [cardCVC, setCardCVC] = useState(DEFAULT_CARD_STATE.cardCVC);
	const [isFlipped, setIsFlipped] = useState(DEFAULT_CARD_STATE.isFlipped);
};

export const useCardState = () => {};
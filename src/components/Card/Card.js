import React, { useMemo } from 'react';
import ReactCardFlip from 'react-card-flip';
import ReactTextTransition from "react-text-transition";

import visa from 'payment-icons/min/mono/visa.svg';
import mastercard from 'payment-icons/min/mono/mastercard.svg';
import amex from 'payment-icons/min/mono/amex.svg';
import diners from 'payment-icons/min/mono/diners.svg';
import discover from 'payment-icons/min/mono/discover.svg';
import jcb from 'payment-icons/min/mono/jcb.svg';
import unionpay from 'payment-icons/min/mono/unionpay.svg';
import maestro from 'payment-icons/min/mono/maestro.svg';

const Card = ({
	              cardHolder,
	              cardNumber,
	              cardMonth,
	              cardYear,
	              cardCVC,
	              isCardFlipped,
	              currentFocusedElm,
	              onCardElementClick,
	              cardNumberRef,
	              cardHolderRef,
	              cardDateRef
              }) => {

	const useCardType = useMemo(() => {
		const CARDS = {
			'visa': '^4',
			'amex': '^(34|37)',
			'mastercard': '^5[1-5]',
			'maestro': '^(?:5[0678]\\\\d{0,2}|6304|67\\\\d{0,2})',
			'discover': '^6011',
			'unionpay': '^62',
			'jcb': '^(?:35\\d{0,2})',
			'diners-club': '^(30[0-5]|36)'
		};

		const cardType = (cardNumber) => {
			const number = cardNumber;
			let re;
			for (const [card, pattern] of Object.entries(CARDS)) {
				re = new RegExp(pattern);
				if (number.match(re) != null) {
					return card;
				}
			}

			return 'credit-card';
		}
		return cardType(cardNumber);
	}, [cardNumber]);

	const cardIconsSwitch = (type) => {
		let cardIcons;

		switch (type) {
			case 'visa':
				cardIcons = visa;
				break;
			case 'amex':
				cardIcons = amex;
				break;
			case 'mastercard':
				cardIcons = mastercard;
				break;
			case 'discover':
				cardIcons = discover;
				break;
			case 'unionpay':
				cardIcons = unionpay;
				break;
			case 'diners-club':
				cardIcons = diners;
				break;
			case 'jcb':
				cardIcons = jcb;
				break;
			case 'maestro':
				cardIcons = maestro;
				break;
			default:
				return <div className="card__type__image empty" />
		}

		const myStyle = {
			WebkitMaskImage: `url(${cardIcons})`,
			maskImage: `url(${cardIcons})`,
			color: 'red'
		};

		return <div className="card__type__image" style={myStyle} />
	}

	return (
		<div className="panel">
			<ReactCardFlip isFlipped={isCardFlipped}>
				<div className="card card--front">
					<div className="card__number">
						{cardNumber === '**** **** **** ****' ? cardNumber : cardNumber.split("").map((n, i) => (
							<ReactTextTransition
								key={i}
								text={n}
								delay={i * 50}
								className="numbers"
								overflow
								inline
							/>
						))}
					</div>
					<div className="card__expiry-date">
						{ cardMonth ? cardMonth : 'MM' }/{
						cardYear ? cardYear.toString().substr(-2) : 'YY' }
					</div>
					<div className="card__owner">
						{ cardHolder }
					</div>
					<div className="card__type">
						{ cardIconsSwitch(useCardType) }
					</div>
				</div>
				<div className="card card--back">
					<div className="card__strip" />
					<div className="card__back-content">
						<div className="card__secret">
							<div className="card__secret--last">
								{cardCVC}
							</div>
						</div>
						<div className="card__type">
							{ cardIconsSwitch(useCardType) }
						</div>
					</div>
				</div>
			</ReactCardFlip>
		</div>
	);
}

export default  Card;
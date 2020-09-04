import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gradient from 'random-gradient';
import ReactCardFlip from 'react-card-flip';
import ReactTextTransition from "react-text-transition";

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

	const CARDS = {
		'visa': '^4',
		'amex': '^(34|37)',
		'mastercard': '^5[1-5]',
		'discover': '^6011',
		//'unionpay': '^62',
		//'troy': '^9792',
		'diners-club': '^(30[0-5]|36)'
	};

	const useCardType = useMemo(() => {
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
	}, [cardNumber, CARDS]);

	const bgGradient = { background: gradient('visa') }

	return (
		<div className="panel">
			<ReactCardFlip isFlipped={isCardFlipped}>
				<div className="card card--front" style={bgGradient}>
					<div className="card__number">
						{cardNumber.split("").map((n, i) => (
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
						{
							useCardType === 'credit-card' ?
							<FontAwesomeIcon icon={['far', 'credit-card']}/> :
							<FontAwesomeIcon icon={['fab', `cc-${useCardType}`]}/>
						}
					</div>
				</div>
				<div className="card card--back" style={bgGradient}>
					<div className="card__strip" />
					<div className="card__back-content">
						<div className="card__secret">
							<div className="card__secret--last">
								{cardCVC}
							</div>
						</div>
						<div className="card__type">
							{
								useCardType === 'credit-card' ?
									<FontAwesomeIcon icon={['far', 'credit-card']}/> :
									<FontAwesomeIcon icon={['fab', `cc-${useCardType}`]}/>
							}
						</div>
					</div>
				</div>
			</ReactCardFlip>
		</div>
	);
}

export default  Card;
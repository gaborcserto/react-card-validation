import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
//import { FieldSet, InputField } from 'fannypack';
//import { usePaymentInputs } from 'react-payment-inputs';
//import images from 'react-payment-inputs/images';
import MaskedFormControl from '../MaskedFormControl';

const CardForm = ({
	                  cardMonth,
	                  cardYear,
	                  onUpdateState,
	                  cardNumberRef,
	                  cardHolderRef,
	                  cardDateRef,
	                  onCardInputFocus,
	                  cardCVC,
	                  children
                  }) => {

	/*const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

	const { erroredInputs, touchedInputs } = meta;*/

	const [cardNumber, setCardNumber] = useState('');
	const currentYear = new Date().getFullYear();
	const monthsArr = Array.from({ length: 12 }, (x, i) => {
		const month = i + 1;
		return month <= 9 ? '0' + month : month;
	});
	const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

	const onCardNumberChange = (event) => {
		let { value, name } = event.target;
		let cardNumber = value;
		value = value.replace(/\D/g, '');
		if (/^3[47]\d{0,13}$/.test(value)) {
			cardNumber = value
				.replace(/(\d{4})/, '$1 ')
				.replace(/(\d{4}) (\d{6})/, '$1 $2 ');
		} else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
			// diner's club, 14 digits
			cardNumber = value
				.replace(/(\d{4})/, '$1 ')
				.replace(/(\d{4}) (\d{6})/, '$1 $2 ');
		} else if (/^\d{0,16}$/.test(value)) {
			// regular cc number, 16 digits
			cardNumber = value
				.replace(/(\d{4})/, '$1 ')
				.replace(/(\d{4}) (\d{4})/, '$1 $2 ')
				.replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
		}

		setCardNumber(cardNumber.trimRight());
		onUpdateState(name, cardNumber);
	};

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		onUpdateState(name, value);
	};

	const onCVCFocus = () => {
		onUpdateState('isCardFlipped', true);
	};

	const onCVCBlur = () => {
		onUpdateState('isCardFlipped', false);
	};



	return (
		<Form className="form">
			<div className="card-list">{children}</div>
			<Form.Group /*controlId="formCardNumber"*/>
				<Form.Label>Card Number</Form.Label>
				<MaskedFormControl type="tel"
							//{...getCardNumberProps()}
				              name="cardNumber"
				              maxLength="19"
				              mask="1111 1111 1111 1111"
				              ref={cardNumberRef}
				              //isInvalid={touchedInputs.cardNumber && erroredInputs.cardNumber}
				              //placeholder="0000 0000 0000 0000"
				              placeholder="Enter card number"
				              onChange={onCardNumberChange}/>
			</Form.Group>
			<Form.Group controlId="formCardHolder">
				<Form.Label>Name on the card</Form.Label>
				<Form.Control type="text"
				              name="cardHolder"
				              ref={cardHolderRef}
				              placeholder="Name on the card"
				              onChange={handleFormChange}/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col} controlId="formCardMonth">
					<Form.Label>Expiration Date</Form.Label>
					<Form.Control as="select"
					              name="cardMonth"
					              onChange={handleFormChange}
					              defaultValue={''}>
						<option value="" disabled>
							Month
						</option>
						{monthsArr.map((val, index) => (
							<option key={index} value={val}>
								{val}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId="formCardYear">
					<Form.Control as="select"
					              name="cardYear"
					              onChange={handleFormChange}
					              defaultValue={''}>
						<option value="" disabled>
							Year
						</option>
						{yearsArr.map((val, index) => (
							<option key={index} value={val}>
								{val}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group as={Col} controlId="formCardCvc">
					<Form.Label>CVC / CVV</Form.Label>
					<Form.Control type="text"
					              name="cardCVC"
					              maxLength="4"
					              placeholder="CVC / CVV"
					              onChange={handleFormChange}
					              onFocus={onCVCFocus}
					              onBlur={onCVCBlur}
					              ref={cardCVC}/>
				</Form.Group>
			</Form.Row>
			<Button className="btn-pay" block>Pay</Button>
		</Form>
	)
}

export  default CardForm;


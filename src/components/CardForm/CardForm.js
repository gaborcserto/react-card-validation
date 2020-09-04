import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Cleave from 'cleave.js/react';

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

	const [validated, setValidated] = useState(false);
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

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	return (
		<Form className="form" validated={validated} onSubmit={handleSubmit}>
			<div className="card-list">{children}</div>
			<Form.Group controlId="formCardNumber">
				<Form.Label>Card Number</Form.Label>
				<Cleave type="tel"
				        required
				        className="form-control"
				        value={cardNumber}
				        options={{creditCard: true}}
				        name="cardNumber"
				        maxLength="19"
				        ref={cardNumberRef}
				        placeholder="Enter card number"
				        onChange={onCardNumberChange}/>
			</Form.Group>
			<Form.Group controlId="formCardHolder">
				<Form.Label>Name on the card</Form.Label>
				<Form.Control type="text"
				              required
				              name="cardHolder"
				              ref={cardHolderRef}
				              placeholder="Name on the card"
				              onChange={handleFormChange}/>
			</Form.Group>
			<Form.Row>
				<Form.Group as={Col} controlId="formCardMonth">
					<Form.Label>Expiration Date</Form.Label>
					<Form.Control as="select"
					              required
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
					              required
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
					<Form.Control type="tel"
					              required
					              name="cardCVC"
					              maxLength={3}
					              placeholder="CVC / CVV"
					              onChange={handleFormChange}
					              onFocus={onCVCFocus}
					              onBlur={onCVCBlur}
					              ref={cardCVC}/>
				</Form.Group>
			</Form.Row>
			<Button className="btn-pay" type="submit" block>Pay</Button>
		</Form>
	)
}

export  default CardForm;


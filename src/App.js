import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Container } from 'react-bootstrap';
import CardValidator from './components/CardValidator';
import './App.scss';

library.add(fab, far);

function App() {
	return (
		<Container className="App">
			<CardValidator/>
		</Container>
	);
}

export default App;

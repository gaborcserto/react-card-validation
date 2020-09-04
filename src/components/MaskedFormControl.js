import React from 'react';
import { Form } from 'react-bootstrap';
import MaskedInput from "react-maskedinput";

const MaskedFormControl = React.forwardRef((props, ref) => (
	<Form.Control as={MaskedInput} {...props} ref={ref} />
));


export default MaskedFormControl;
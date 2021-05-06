import React from 'react';
import { Form, Button } from 'react-bootstrap';

class NewRegistration extends React.Component {
	state = {
		name: '',
		surname: '',
		email: '',
		password: '',
		yearofBirth: '',
		streetAddress: '',
		city: '',
		postalCode: '',
		creditCard: '',
	};
	render() {
		return (
			<>
            <h2>Registration Form</h2>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control required type="text" placeholder="Enter Name" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Surname</Form.Label>
						<Form.Control required type="text" placeholder="Enter Surname" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control required type="email" placeholder="Enter Email" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control required type="password" placeholder="Enter Password" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Year Of Birth</Form.Label>
						<Form.Control required type="date-time" placeholder="Enter Year Of Birth" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Street Address</Form.Label>
						<Form.Control required type="text" placeholder="Enter Street Name" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>City</Form.Label>
						<Form.Control required type="text" placeholder="Enter City" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control required type="number" placeholder="Enter Postal Code" />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Credit Card</Form.Label>
						<Form.Control required type="password" placeholder="Enter Credit Card" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</>
		);
	}
}
export default NewRegistration;

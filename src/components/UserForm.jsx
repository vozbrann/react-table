import React, {Component} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import {newId} from '../utils/localStorage';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import './userForm.scss'

const schema = yup.object({
  firstName: yup.string().required().min(3, "min name length is 3").max(20, "max name length is 20"),
  lastName: yup.string().required().min(3, "min last name length is 3").max(20, "max last name length is 20"),
  phone: yup.string().required(),
  gender: yup.bool().required(),
  age: yup.number().integer().required().min(1, "should be in range 1 - 130").max(130, "should be in range 1 - 130"),
});

class UserForm extends Component {
  render() {
    return (
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          this.props.onSubmit({id:newId(), ...values});
          resetForm();
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          gender: true,
          age: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={touched.firstName && errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Phone</Form.Label>
                <PhoneInput
                  country={'ua'}
                  value={values.phone}
                  name="phone"
                  onChange={phone => handleChange({target: {value: phone, name: "phone"}})}
                  isValid={(inputNumber) => {
                    return !touched.lastName || inputNumber.length === 12;
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={touched.lastName && errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik03">
                <Form.Label>Gender</Form.Label>
                <div className="d-flex flex-column">
                  <ButtonGroup toggle>
                    <ToggleButton
                      variant="outline-info"
                      type="radio"
                      name="gender"
                      onChange={() => setFieldValue("gender", true)}
                      checked={values.gender}
                      value={true}>
                      Male
                    </ToggleButton>
                    <ToggleButton
                      variant="outline-info"
                      type="radio"
                      name="gender"
                      onChange={() => setFieldValue("gender", false)}
                      checked={!values.gender}
                      value={false}>
                      Female
                    </ToggleButton>
                  </ButtonGroup>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik03">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  maxLength="3"
                  min="1"
                  max="130"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  isInvalid={touched.age && errors.age}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.age}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default UserForm;

import React, { useContext, useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from 'contexts/ConfigContext';

const JWTLogin = () => {
  const { signin, setUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    touched: false
  });

  const [loading , setLoading] = useState(false);


  const handleBlur = () => {
    if (userData.email.trim() === '' || userData.password.trim() === '') {
      setUserData({
        ...userData,
        touched: true // Mark the input as touched by the user
      });
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await signin(userData);

      // const resData = await res
      setUser(res);
      if (res.ok) {
        setLoading(false);
        navigate('/dashboard');
      } 

      if (res.status == 401) {
        setLoading(false)
        navigate('/login')
      }
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
    >
      {({ errors, touched }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
            // value={values.email}
            />
            {userData.touched && userData.email.trim() === "" && (
              <small className="text-danger form-text">Please provide email</small>
            )}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
            // value={values.password}
            />
            {userData.touched && userData.password.trim() === "" && (
              <small className="text-danger form-text">Please provide password</small>
            )}
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" type='submit' size="large" variant="primary">
                {
                  loading ? "Loading..." : "Signin"
                }
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;

import React from 'react';
import '../css/LoginCSS.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
  // const uri = process.env.BACKEND_URI;
  const uri = 'http://localhost:3001';
  async function addUser(user) {
    const newTicket = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      query: user.query,
      notes: user.notes,
      creationTimeStamp: new Date(new Date().toISOString())
    };

    const res = await axios.post(`${uri}/user/new-user`, newTicket);
    if (res.status === 200 || res.status === 'OK') {
      window.location.reload();
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z-' ]+$/, "Names can't have special characters")
      .required('Please enter your name'),
    email: Yup.string().email('Invalid email').required('Please enter your email'),
    password: Yup.string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain 8 characters, one uppercase, one lowercase, one number, and one special character'
      ),
  });

  return (
    <div className="container centered" style={{ marginTop: '20px' }}>
      <div className="row justify-content-center shadow-lg p-3 mb-5 loginColumn bg-white rounded loginContainer">
        <div className="col-lg-4 col-11 d-flex flex-column ms-5 loginColumn">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              addUser(values);
            }}
            validationSchema={validationSchema}
          >
            {({ touched, errors }) => (
              <Form className="helpdesk-form">
                <div className="text-center" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <h2 className="form-title">Login Page</h2>
                </div>
                <div className="form-group">
                  <label>Name<span>*</span></label><br />
                  <Field type="text" name="name" placeholder="Enter name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Email<span>*</span></label>
                  <br />
                  <Field type="email" name="email" placeholder="Enter email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label>Password<span>*</span></label>
                  <br />
                  <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div className="form-group form-control-sm">
                  <div className="text-center">
                    <button type="submit" className="btn btn-outline-danger" name="submit" style={{ marginTop: '20px' }}>Submit</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-lg-6 col-10 d-flex flex-column ms-5 d-flex flex-column loginColumn justify-content-center gradient-custom-2 h-100 mb-4" style={{marginTop:'50px'}}>
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>
      </div>
    </div>
  );
}

export default Login;
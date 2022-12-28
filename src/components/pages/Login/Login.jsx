import { useState } from 'react';
import {
  Button, FloatingLabel, Form, Image, InputGroup,
} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import logoIcon from '../../../images/icon-colored.svg';
import { EMAIL_REGEX } from '../../../utils/constants';
import { loginFormValidate } from '../../../utils/validation';

import './Login.css';

function Login({ onLogin, isLoading }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: loginFormValidate,
    onSubmit: (values) => {
      onLogin({
        email: values.email,
        password: values.password,
        fromPage,
      });
    },
  });

  function togglePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  return (
    <main className='login bg-dark d-flex'>
      <div
        className='login__container w-100 m-auto d-flex flex-column align-items-center justify-content-center'
        >
        <Image src={logoIcon} alt='логотип' className='login__logo mb-4'/>
        <h1 className='text-light h3 mb-4 fw-normal'>
          Добро пожаловать!
        </h1>
        <Form className='w-100' onSubmit={formik.handleSubmit} noValidate name='login-form'>
          <fieldset disabled={isLoading}>
            <FloatingLabel
              controlId='floatingInput'
              label='Email'
              className='mb-3'>
              <Form.Control
                type='email'
                name='email'
                placeholder='name@example.com'
                pattern={EMAIL_REGEX}
                autoFocus
                required
                onChange={formik.handleChange}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
                autoComplete={'off'}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </FloatingLabel>

            <InputGroup className='mb-5' >
              <FloatingLabel
                controlId='floatingPassword'
                label='Пароль'>
                <Form.Control
                  type={isPasswordVisible ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                  autoComplete={'off'}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>

              <InputGroup.Text onClick={togglePasswordVisibility} className='login__input-toggler'>
                 { isPasswordVisible ? < FaEyeSlash size={20}/> : < FaEye size={20}/> }
              </InputGroup.Text>
            </InputGroup>

            <Button
              className='w-100'
              variant='primary'
              size='lg'
              type='submit'
              aria-label='Войти'>
              {isLoading ? 'Загрузка...' : 'Войти'}
            </Button>
          </fieldset>
        </Form>
      </div>
    </main>
  );
}

export default Login;

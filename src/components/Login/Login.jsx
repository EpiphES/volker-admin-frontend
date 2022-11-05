import './Login.css';
import { GiWolfHead } from 'react-icons/gi';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

import { useState } from 'react';
import { useFormik } from 'formik';

import {
  Form,
  FloatingLabel,
  Button,
  InputGroup, 
} from 'react-bootstrap';

const validate = values => {
   const errors = {};

   if (!values.email) {
     errors.email = 'Поле должно быть заполнено';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Некорректный адрес электронной почты';
   } 
    
   if (!values.password) {
     errors.password = 'Поле должно быть заполнено';
   } 
   
   return errors;
 };

function Login({ onLogin }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      onLogin({email: values.email, password: values.password});
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
        <GiWolfHead className='login__logo mb-4'/>
        <h1 className='text-light h3 mb-4 fw-normal'>
          Добро пожаловать!
        </h1>
        <Form className='w-100' onSubmit={formik.handleSubmit} noValidate>
          <fieldset>
            <FloatingLabel
              controlId='floatingInput'
              label='Email'
              className='mb-3'>
              <Form.Control
                type='email'
                name='email'
                placeholder='name@example.com'
                autoFocus
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                  autoComplete={'off'} 
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>                
              </FloatingLabel>
              
              <InputGroup.Text onClick={togglePasswordVisibility} className='login__input-toggler' >
                 { isPasswordVisible ? < FaEyeSlash /> : < FaEye /> }             
              </InputGroup.Text>
              
              
            </InputGroup>
            <Form.Control.Feedback type="invalid">
                {formik.errors.password}
            </Form.Control.Feedback>
            <Button
              className='w-100'
              variant='primary'
              size='lg'
              type='submit'
              aria-label='Войти'
              disabled={!formik.isValid}
              >
              Войти
            </Button>
          </fieldset>
        </Form>
      </div>      
    </main>
  )
}

export default Login
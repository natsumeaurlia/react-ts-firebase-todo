import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { auth } from '../firebase';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

// firebaseの連携テストなのでLoginで登録も兼任する
const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const [useLogin, setUseLogin] = useState(true);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push('/');
    });
    return () => unSub();
  }, []);

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      props.history.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const register = async () => {
    try {
      await auth.createUserWithEmailAndPassword(values.email, values.password);
      props.history.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h3>{useLogin ? 'ログイン' : '登録'}</h3>
      <div>
        <FormControl>
          <InputLabel htmlFor='email'>email</InputLabel>
          <Input id='email' type='email' value={values.email} onChange={handleChange('email')} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='pass'>Password</InputLabel>
          <Input
            id='pass'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant='outlined' onClick={() => (useLogin ? login() : register())}>
          {useLogin ? 'ログイン' : '登録'}
        </Button>
      </div>
      <br />
      <div onClick={() => setUseLogin(!useLogin)}>{useLogin ? '登録はこちら' : 'ログインはこちら'}</div>
    </div>
  );
};

export default Login;

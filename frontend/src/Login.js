import React, { Component, useState } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const axios = require('axios');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const login = () => {
    const pwd = bcrypt.hashSync(state.password, salt);

    axios
      .post('http://localhost:2000/login', {
        username: state.username,
        password: pwd,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.id);
        console.log({ history });
        history.push('/blog');
        axios
          .get('http://localhost:2000/blogs')
          .then((res) => {
            console.log({ res });
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          value={state.username}
          onChange={onChange}
          placeholder="User Name"
          required
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          value={state.password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={state.username == '' && state.password == ''}
          onClick={login}
        >
          Login
        </Button>
        <Link href="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;

import React, { Component, useState } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

const Register = (props) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    confirm_password: '',
  });

  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const register = () => {
    alert(JSON.stringify(state));
    axios
      .post('http://localhost:2000/register', {
        username: state.username,
        password: state.password,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: 'success',
          type: 'success',
        });
        props.history.push('/');
      })
      .catch((err) => {});
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Register</h2>
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
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="confirm_password"
          value={state.confirm_password}
          onChange={onChange}
          placeholder="Confirm Password"
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
          onClick={register}
        >
          Register
        </Button>{' '}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/">Login</Link>
      </div>
    </div>
  );
};

export default Register;

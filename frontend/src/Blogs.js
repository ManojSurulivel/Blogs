import React, { Component, useState } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { blogs } from './mock';
import BlogPage from './BlogPage';
const axios = require('axios');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const Blogs = () => {
  const history = useHistory();
  const [state, setState] = useState({
    blogName: '',
  });
  const [blogsData, setBlogsData] = useState(blogs);
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const saveBlog = () => {
    setBlogsData([...blogsData, { name: state.blogName }]);
    axios
      .post('http://localhost:2000/blogs', {
        name: state.blogName,
      })
      .then((res) => {})
      .catch(() => {});
  };

  const getBlogs = () => {
    axios.get('http://localhost:2000/blogs').then((res) => {
      setBlogsData(res?.data?.data);
    });
  };

  React.useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Blogs</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="blogName"
          value={state.blogName}
          onChange={onChange}
          placeholder="Blog Name"
          required
        />
        <br />
        <br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={state.blogName == ''}
          onClick={saveBlog}
        >
          Save
        </Button>
      </div>
      <div>
        <h1>Saved Blogs</h1>
        {blogsData?.map((value) => {
          return (
            <div
              onClick={() => {
                history.push({
                  pathname: `/blogPage`,
                  state: {
                    name: value.name,
                  },
                });
              }}
              style={{ margin: '16px 0' }}
            >
              <a href=""> {value.name}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;

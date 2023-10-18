import React, { useEffect, useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

export default function App() {

  const [users,setUsers]=useState([])
  useEffect(()=>{
    fetch('https://coconut-heliotrope-microceratops.glitch.me/getUsers')
    .then(resp=> resp.json())
    .then(json=>{
      setUsers(json.msg)
    })
  },[])
  const schema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().required()
  })
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })
  
  const formData = (data) => {
    axios({
      url:'https://coconut-heliotrope-microceratops.glitch.me/insert',
      method:'POST',
      data:data
    }).then((res)=>{
      reset()
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div
     className='container-fluid d-flex flex-column 
      align-items-start justify-content-center ' style={{ minHeight: '100vh',height:'auto' }}>
      <div className="form-outer">
        <form className='mb-5' onSubmit={handleSubmit(formData)}>
        <div className="header">
          <h2>Add User</h2>
        </div>
        <div className="inputs">
          <input type="text" {...register('userName')} className='form-control' placeholder='User Name' />
          <p>{errors.userName?.message}</p>
          <input type="text" {...register('password')} className='form-control' placeholder='User Name' />
          <p>{errors.password?.message}</p>
        </div>
        <div className="btn-submit">
          <button className='btn btn-primary col-8'>Save</button>
        </div>
      </form>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((e,index)=>
              
              <tr key={index}>
                <td>{e._id}</td>
                <td>{e.userName}</td>
                <td>{e.password}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

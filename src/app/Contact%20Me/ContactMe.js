import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';


export default function ContactMe(){
  const form = useRef();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  const [show,setShow]=useState(false);
  const [error,setError]=useState(false);
  const [errMessage,setErrMessage]=useState('Please fill out all the fields.')

  const sendEmail = (e) => {
    e.preventDefault();
    if(name=='' || email=='' || message==''){
        return (setError(true), setShow(false));
    }
    setName('');
    setEmail('');
    setMessage('');
      emailjs.sendForm('service_27owqng', 'template_c0f74zx', form.current, 'ZxQTX8hTWVdsrBpbM')
      .then((result) => {
          setShow(true);
          setError(false);
      }, (error) => {
          setError(true);
          setErrMessage(error);
      });
  };

  return (
      <>
      {show && <div className='fixed alert' role="alert">
  <div className="bg-green-500 text-white font-bold rounded-t ">
  <div onClick={()=>setShow(false)}className='closebtn'>
  x
  </div>
    <div className='pl-2'>Success</div>
  </div>
  <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-center text-black">
    <p>Your message has been sent.</p>
  </div>
</div>}
      {error && <div className='fixed alert' role="alert">
  <div className="bg-red-500 text-white font-bold rounded-t ">
  <div onClick={()=>setError(false)}className='closebtn'>
  x
  </div>
    <div className='pl-2'>Error</div>
  </div>
  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-center text-black">
    <p>{errMessage}</p>
  </div>
</div>}
      <form className="form flex flex-col justify-around" ref={form} onSubmit={sendEmail}>
          <h1 className='text-center font-mono font-semibold  text-2xl'>Contact Me</h1>
          <div className='flex flex-col'>
              <label>Name</label>
              <input maxlength="100" className='text-black pl-2 border-solid border-black rounded-md border-opacity-75 border-2' value={name} onChange={(e)=>setName(e.target.value)} type="text" name="user_name" />
          </div>
          <div className='flex flex-col'>
              <label>Email</label>
                  <input maxlength="100"  className='text-black pl-2 border-solid border-black rounded-md border-opacity-75 border-2' value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="user_email" />
          </div>
          <div className='flex flex-col'>
                  <label>Message</label>
                  <textarea maxlength="300"  className=' text-black h-32 pl-2 border-solid pt-1 border-black rounded-md border-opacity-75 border-2' value={message} onChange={(e) => setMessage(e.target.value)} name="message" />
                  <input onSubmit={sendEmail} className='hover:bg-gray-300 hover:text-black bg-gray-600 w-30 h-10 mt-2 rounded-md ' type="submit" value="Send" />
          </div>

      
    </form>
</>
  );
};
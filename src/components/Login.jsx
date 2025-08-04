import React, { useState } from 'react'
import axios from 'axios';

function Login() {

     const [formData, setFormDate] = useState({
    name: "",
    password:"",  
 });
   const [errors,setErrors] = useState({});

 const handleChange  = async(e) =>{
    setFormDate({...formData,[e.target.name]:e.target.value})
       setErrors({ ...errors, [e.target.name]: '' }); 
 };

   const validate = () => {
    const newErrors = {};
    if(!formData.name.trim()) newErrors.name="Username is required";
    if(!formData.password.trim()) newErrors.password="Password is required";
 
    return newErrors;
  };

 const handleSubmit = async(e) =>{
    e.preventDefault(e);
       const validtionErrors = validate();
    if(Object.keys(validtionErrors).length > 0){
      setErrors(validtionErrors);
      return;
    }

    try {
    const res =   await axios.post("http://localhost/ComplaintMonitoring/login.php", formData);
     // alert("Form submitted successfully");
      //alert(res.data.response);
      if(res.data.response == 1) 
         { alert("Login Sucessfull...!"); }
      else 
         { alert("Login Failed"); }

    } catch (error) {
      alert("Failed to submit: " + error.message);
    }
 };

  return (
    <div>
      <p className='text-4xl text-center text-blue-600 hover:text-pink-600'>Complaint Monitoring App</p>

        <p className='text-2xl mt-4 font-bold text-center text-purple-600 hover:text-green-600'>Login</p> 

 <form onSubmit={handleSubmit} className="space-y-4">
     <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
            name="name"
            type ="Text" 
            placeholder="Enter Your Name"
            value={formData.name}
             onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />
              {errors.name && <p className = "text-red-500 text-sm">{errors.name}</p>}
     </div>

     <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              name="password"
            type ="password" 
            placeholder="Enter Your Password"
            value={formData.password}
             onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />
              {errors.password && <p className = "text-red-500 text-sm">{errors.password}</p>}
     </div>

<div className="flex justify-center">
        <button
       
           type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
         >
          Submit
        </button>
        </div>
 </form>
          
    </div>


  )
}

export default Login
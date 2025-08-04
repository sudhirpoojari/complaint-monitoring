import React, { use, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

  const [formData,setFormdata] = useState({
    name :"",
    email:"",
    mno:"",
    username:"",
    password:"",
    address:"",
  });
  const [errors,setErrors] = useState({});

  const  handleChange = async(e) =>{
   setFormdata({...formData,[e.target.name]:e.target.value})
   setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    if(!formData.name.trim()) newErrors.name = "Name is required";
    if(!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email ="Valid Email ID is required ";
    if(!formData.mno.trim() || !phoneRegex.test(formData.mno)) newErrors.mno = "Enter Valid Phone Number";
    if(!formData.username.trim()) newErrors.username="Username is required";
    if(!formData.password.trim()) newErrors.password="Password is required";
    if(!formData.address.trim()) newErrors.address="Address is required";
    return newErrors;
  };



  const  handleSubmit = async(e) => {
    e.preventDefault(e);

    const validtionErrors = validate();
    if(Object.keys(validtionErrors).length > 0){
      setErrors(validtionErrors);
      return;
    }
    try
    {
      const res = await axios.post("http://localhost/ComplaintMonitoring/signup.php", formData);

    //  alert(res.data.response.includes(success));
       if(res.data.response.includes("success")) {
          alert("Data Saved Sucessful...!");
           setFormdata({ name: '', email: '', mno: '', username: '', password: '',address :'' });
          navigate('/login');
          
        }
       else if(res.data.response.includes("exist")){
          alert("User already exist...!");
        } 
        else {
        alert('Signup failed.');
      }
       
    }
    catch(error)
    {
      alert("'❌ Failed to submit: " + error.message);
      
    }
  };

  return (
    <div>
      <p className='text-4xl text-center text-blue-600 hover:text-pink-600'>Complaint Monitoring App</p>

        <p className='text-2xl mt-1 font-bold text-center text-purple-600 hover:text-green-600'>Sign Up</p> 

 <form  onSubmit={handleSubmit} className="space-y-2">
     <div className="max-w-md mx-auto mt-1 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
            name="name" 
            type ="Text" 
            placeholder="Enter Name"
            onChange={handleChange}
            value={formData.name}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />
         
             {errors.name && <p className = "text-red-500 text-sm">{errors.name}</p>}
     </div>

     <div className="max-w-md mx-auto mt-1 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
            name="email"
            type ="email" 
            placeholder="Enter Email"
            onChange={handleChange}
            value={formData.email}

            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
     </div>

         <div className="max-w-md mx-auto mt-1 p-4 bg-white rounded-2xl shadow-lg">
         <label className="block text-sm font-medium text-gray-700">Mobile No</label>
           <input 
            name="mno"
            type ="mno" 
            onChange = {handleChange}
            value={formData.mno}
            placeholder="Enter Mobile No"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />
              {errors.mno && <p className="text-red-500 text-sm">{errors.mno}</p>}
         </div>


         <div className="max-w-md mx-auto mt-1 p-4 bg-white rounded-2xl shadow-lg">
           <label className="block text-sm font-medium text-gray-700">Address</label>
           <input 
            name="address"
            type ="address" 
            onChange = {handleChange}
            value={formData.address}
            placeholder="Enter address"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
         </div>


      <div className="max-w-md mx-auto mt-1 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input 
            name="username"
            type ="text" 
            onChange = {handleChange}
            value={formData.username}
            placeholder="Enter User Name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />

              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
     </div>

      <div className="max-w-md mx-auto mt-1 p-4 bg-white rounded-2xl shadow-lg">
        <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
            name="password"
            type ="password" 
            onChange = {handleChange}
            value={formData.password}
            placeholder="Enter Password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
             />

              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
     </div>

    <div className="flex justify-center">
        <button type="submit" 
        className=" align-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >Sign Up </button>

        <button 
        type="reset" 
        value="Reset"       
        className ="align-center ml-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md "> Reset </button>
     </div>
 <p ClassName="mb-4"></p>
 </form>
          
    </div>


  )
}

export default Signup
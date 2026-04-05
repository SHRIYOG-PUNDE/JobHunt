import React from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const Signup = () => {
    const [input, setInput] = React.useState({
    email:"",
    password:"",
    phonenumber:"",
    fullName:"",
    role:"",
    file:"",
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value})
  }
  const changeFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullName);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
        formData.append("file", input.file);
    }
    try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers:{
                "Content-Type":"multipart/form-data",
            },
            withCredentials:true,
        });
        if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
     console.log(error);
     toast.error(error.response.data.message);
    }
  }
    return (
        <div>
            <div>
                <NavBar />
                <div className='flex items-center justify-center max-w-7xl mx-auto'>
                    <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                        <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                        <div className='my-3'>
                            <Label className='mb-2'>Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullName}
                                name="fullName"
                                onChange={changeEventHandler}
                                placeholder="Shriyog Punde"
                            />
                        </div>
                        <div className='my-3'>
                            <Label className='mb-2'>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="shriyog.punde@example.com"
                            />
                        </div>
                        <div className='my-3'>
                            <Label className='mb-2'>Phone No.</Label>
                            <Input
                                type="text"
                                name="phonenumber"
                                value={input.phonenumber}
                                onChange={changeEventHandler}
                                placeholder="123-456-7890"
                            />
                        </div>
                        <div className='my-3'>
                            <Label className='mb-2'>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <RadioGroup className='flex items-center gap-4 my-5'>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === "student"}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'
                                    />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruter"
                                        checked={input.role === "recruter"}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'
                                    />
                                    <Label htmlFor="r2">Recruter</Label>
                                </div>
                            </RadioGroup>
                            <div className='flex items-center gap-2'>
                                <Label>Profile</Label>
                                <Input
                                accept='image/*'
                                type='file'
                                onChange={changeFileHandler}
                                className='cursor-pointer'
                                />
                            </div>
                        </div>
                        <Button type='submit' className='w-full my-4'>Sign Up</Button>
                        <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup
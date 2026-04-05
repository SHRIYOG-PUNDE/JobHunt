import React from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const Login = () => {
      const [input, setInput] = React.useState({
      email:"",
      password:"",
      role:"",
    });
    
    const navigate = useNavigate();
    const changeEventHandler = (e) =>{
      setInput({...input, [e.target.name]:e.target.value})
    }
    const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
        });
        if(res.data.success){
            navigate("/");
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
                        <h1 className='font-bold text-xl mb-5'>Login </h1>
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
                                    <Label htmlFor="option-one">Student</Label>
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
                                    <Label htmlFor="option-two">Recruter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <Button type='submit' className='w-full my-4'>Login</Button>
                        <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign Up</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login
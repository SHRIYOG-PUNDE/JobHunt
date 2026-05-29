import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "asfvvihhjwvr"
  const daysAgoFunction = (mongodbTime) => {
    const cretedDate = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDiff = currentDate - cretedDate;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size="icon">
          <Avatar>
            <AvatarImage src="data:image/jpeg;base64,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" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} Positions</Badge>
            <Badge className='text-[#f83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
            <Badge className='text-[#7209b7] font-bold' variant='ghost'>{job?.salary}LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
          <Button variant='outline' onClick={()=> navigate(`/description/${job?._id}`)}>Details</Button>
          <Button className="bg-[#7209b7]">Save for Later</Button>
        </div>
    </div>
  )
}

export default Job
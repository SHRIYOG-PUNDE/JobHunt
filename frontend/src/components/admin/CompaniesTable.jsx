import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of your registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell>
                    <Avatar>
                        <AvatarImage src="data:image/jpeg;base64,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"/>
                    </Avatar>
                </TableCell>
                <TableCell>CompanyName</TableCell>
                <TableCell>18-07-2026</TableCell>
                <TableCell className='text-right cursor-pointer'>
                    <Popover>
                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className='w-32'>
                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                <Edit2 className='w-4'/>
                                <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable
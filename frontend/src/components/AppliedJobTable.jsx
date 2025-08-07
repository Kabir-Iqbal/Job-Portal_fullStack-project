import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  // const {allAppliedJobs} = useSelector(store=>store.job)
  const { allAppliedJobs = [] } = useSelector((store) => store.job);
  console.log("All applied jobs", allAppliedJobs);


  return (
      <div className="w-full overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-gray-500">
            A list of your applied jobs
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!allAppliedJobs || allAppliedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  You haven't applied to any job yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="min-w-[120px]">
                    {appliedJob.job?.title}
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    {appliedJob.job?.company?.name}
                  </TableCell>
                  <TableCell className="text-right min-w-[100px]">
                    <Badge
                      className={`${
                        appliedJob?.status === "Rejected"
                          ? "bg-red-400"
                          : appliedJob?.status === "Pending"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      } text-white`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
  )
}

export default AppliedJobTable

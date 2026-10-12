
"use client"



import { useState } from "react";
import { useAddUserMutation, useDeleteUsersMutation, useEditUsersMutation, useStatusUsersMutation,useGetUsersQuery  } from "@/api/todo";
import Link from "next/link";






export default function Home() {

const [open,setOpen]=useState(false)

const [openA,setOpenA]=useState(false)



const {data,refetch,isLoading,isError}=useGetUsersQuery("")
const [deleteUser,{data:data2}]=useDeleteUsersMutation()
const [statusUser,{data:data3}]=useStatusUsersMutation()
const [addUser,{data:data4}]=useAddUserMutation()

const [editUser,{data:data5}]=useEditUsersMutation()

const [emp,setEmp]=useState({idx:null,nameE:"",descE:""})



const handleDelete=async (id:number)=>{
 await  deleteUser(id),
   await refetch()
}




const handleStatus=async (id:number)=>{
 await statusUser(id),
   await refetch()
}


const addU=async (e)=>{
  e.preventDefault()
  const formData=new FormData()
  formData.append("name",e.target["name"].value)
  formData.append("description",e.target["description"].value)
  formData.append("images",e.target["file"].files[0])
await addUser(formData)
  await refetch()


  setOpenA(false)

  e.target.reset();
}


const editU=async (e)=>{
  e.preventDefault()
let obj={
  id:emp.idx,
  name:e.target["name"].value,
  description:e.target["description"].value
}
await editUser(obj)

await refetch()

setOpen(false)

setEmp({idx:null,nameE:"",descE:""})
e.target.reset();


}






  return (
   <div>



<dialog
  open={openA}
  className="fixed inset-0 m-auto w-[90%] max-w-md bg-[#18181f] text-white border border-white/10 rounded-2xl p-7 shadow-2xl"
>
  <h2 className="text-2xl font-bold mb-2">
    Create Task
  </h2>

  <p className="text-gray-400 text-sm mb-6">
    Fill in the information below.
  </p>

  <form onSubmit={addU} className="space-y-4">
    <input
      type="file"
      name="file"
      className="w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-white"
    />

    <input
      type="text"
      name="name"
      placeholder="Task name"
      required
      className="w-full bg-[#252530] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
    />

    <textarea
      name="description"
      placeholder="Description"
      required
      className="w-full bg-[#252530] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none"
      rows={3}
    />

    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        className="flex-1 bg-violet-600 hover:bg-violet-700 rounded-xl py-3 font-semibold"
      >
        Save
      </button>

      <button
        type="button"
        onClick={() => setOpenA(false)}
        className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl py-3"
      >
        Cancel
      </button>
    </div>
  </form>
</dialog>






<dialog
  open={open}
  className="fixed inset-0 m-auto w-[90%] max-w-md bg-[#18181f] text-white border border-white/10 rounded-2xl p-7 shadow-2xl"
>
  <h2 className="text-2xl font-bold mb-2">
    Edit Task
  </h2>

  <p className="text-gray-400 text-sm mb-6">
    Update your task information.
  </p>

  <form onSubmit={editU} className="space-y-4">
    <input
      type="text"
      name="name"
      defaultValue={emp.nameE}
      placeholder="Task name"
      required
      className="w-full bg-[#252530] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition"
    />

    <textarea
      name="description"
      defaultValue={emp.descE}
      placeholder="Description"
      required
      rows={3}
      className="w-full bg-[#252530] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 resize-none transition"
    />

    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        className="flex-1 bg-violet-600 hover:bg-violet-700 rounded-xl py-3 font-semibold transition"
      >
        Save Changes
      </button>

      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setEmp({ idx: null, nameE: "", descE: "" });
        }}
        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition"
      >
        Cancel
      </button>
    </div>
  </form>
</dialog>


<button
  onClick={() => setOpenA(true)}
  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg shadow-violet-500/20"
>
  + Add Task
</button>





<div className="grid grid-cols-4 gap-[30px] py-[30px] px-[20px]">
{
  data?.data?.map((user)=>(
    <div key={user.id} className="border-[0.6px] flex flex-col gap-[10px] border-[white] p-[20px] rounded-[15px] bg-[#282727] ">
      {
        user.images.map((imge)=>(
          <img className="w-[300px] h-[200px] " src={`https://to-dos-api.softclub.tj/images/${imge.imageName}`} alt="" />
        ))
      }
<h1>{user.name}</h1>
<p>{user.description}</p>
<div>
  <input type="checkbox" onChange={()=>handleStatus(user.id)} checked={user.isCompleted?"checked":""}/>
<span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${ user.isCompleted ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400" }`} > <span className={`w-2 h-2 rounded-full ${ user.isCompleted ? "bg-green-400" : "bg-red-400" }`} /> {user.isCompleted ? "Active" : "Inactive"} </span>
</div>


<div className="flex items-baseline gap-[10px]">
<button className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition duration-200"><Link  href={`/${user.id}`}>Info</Link></button>

<button onClick={() => handleDelete(user.id)} className="flex-1 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition duration-200" > Delete </button>

<button
  onClick={() =>
    (setOpen(true),
    setEmp({
      idx: user.id,
      nameE: user.name,
      descE: user.description,
    }))
  }
  className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition duration-200"
>
  Edit
</button>
</div>




    </div>
  ))
}

</div>






   </div>
  );
}

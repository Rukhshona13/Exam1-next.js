
"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import { useGetIdsQuery } from "@/api/todo";

function PageContent() {
  const { userid } = useParams<{ userid: string }>();
const [open,setOpen]=useState(false)
  const { data, refetch } = useGetIdsQuery(userid);




  return (
    <div>
    
<dialog open={open}>
  <form onSubmit={(e)=>handleChange(e.target.value)}>
<input type="file" />

   
      <button
        type="submit"
        className="flex-1 bg-violet-600 hover:bg-violet-700 rounded-xl py-3 font-semibold"
      >
        Save
      </button>

      <button
        type="button"
        onClick={() => setOpen(false)}
        className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl py-3"
      >
        Cancel
      </button>
  </form>
</dialog>


        <div key={data?.data?.id}>
             {
        data?.data?.images?.map((imge)=>(
          <img className="w-[300px] h-[200px] " src={`https://to-dos-api.softclub.tj/images/${imge.imageName}`} alt="" />
        ))
      }

      <button
  onClick={()=>setOpen(true)}
  className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-3 rounded-xl font-semibold transition duration-300 shadow-lg shadow-violet-500/20"
>
  Add
</button>

          <h1>{data?.data?.name}</h1>
          <p>{data?.data?.description}</p>
        </div>
    
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PageContent />
    </Suspense>
  );
}


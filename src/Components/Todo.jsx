import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md"

const Todo = () => {
   const [task, settask] = useState("")
   const [desc, setdesc] = useState("")
   const [mainTask, setmainTask] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
   const submitHandler =(e)=>{
    setmainTask([...mainTask, {task, desc}])
    e.preventDefault()
    settask("")
    setdesc("")
   }
   const deleteHandler = (i) =>{
    let copytask =[...mainTask]
    copytask.splice(i,1)
    setmainTask(copytask)

   }
   let renderTask = <h2>No Task Available</h2>
   if (mainTask.length>0) {
    renderTask = mainTask.map((t, i)=>{
    return(
      <li key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-around gap-1 sm:gap-4 w-full ">
          <h5 className="sm:text-xl text-lg lg:text-2xl font-semibold break-words">{t.task}</h5>
          <h6 className="sm:text-lg lg:text-xl  text-sm font-semibold break-words">{t.desc}</h6>
        </div>
        <button onClick={()=>{
          deleteHandler(i)
        }}
        className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded flex justify-center text-lg"><MdDeleteOutline /></button>
      </li>
    )
   })
    
   }
   useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(mainTask));
}, [mainTask]);
   

  return (

   <div className='wrapper'>
        
        <div className="todo flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1641154706848-fe27fd366032?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center min-h-screen px-2">
        <div className="todo-form w-[90%] sm:w-[80%] md:w-[60%] lg:min-h-[300px] lg:w-2/5 backdrop-blur-sm sm:p-6 bg-white/30 rounded-2xl px-2">
            <h1 className='text-zinc-900 p-5 lg:text-3xl text-2xl font-bold text-center font-serif'>Chirosree's Todo List</h1>
            <form className="flex lg:flex-row flex-col gap-3 justify-center items-center " onSubmit={submitHandler}>
                <input type="text" className='w-full lg:w-auto lg:flex-1 lg:text-xl sm:text-lg text-base border-zinc-800 border-2 px-4 py-2' 
                placeholder='Enter Your Task'
                value={task}
                onChange={(e)=>{
                  settask(e.target.value)
                }}/>
                <input type="text" className='w-full lg:w-auto lg:flex-1 lg:text-xl sm:text-lg text-base border-zinc-800 border-2 px-4 py-2'
                 placeholder='Enter Task Description (optional)'
                 value={desc}
                 onChange={(e)=>{
                  setdesc(e.target.value)
                 }}/>
                <button className='bg-green-700 text-white px-4 py-2 mb-2 lg:text-xl text-lg font-bold rounded flex gap-2 items-center justify-center'>Add Task <IoAddOutline /></button>

            </form>
            <hr/>
            <div className="p-6 ">
              <ul >
                <li>{renderTask}</li>
                
              </ul>
            </div>
            

        </div>
        
            
             

        </div>
        
   
    </div>
  )
}

export default Todo
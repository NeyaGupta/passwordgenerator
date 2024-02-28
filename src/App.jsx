import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false)
  const [password, setPassword]=useState("")

//useRef hook
const passwordRef =useRef(null)
const passwordCreator = useCallback(() =>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str=str+"0123456789"
  if(charAllowed) str=str+"!@#$%^&*()_+=-{}[]`~"

  for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }

  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])

useEffect(()=>{
  passwordCreator()
},[length, numberAllowed, charAllowed, passwordCreator])



const copyToClipBoard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,999);
  window.navigator.clipboard.writeText(password)
},[password])
  return (
    <>
    <div className='back'>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 bg-gray-700 text-yellow-500'>
      <h1 className='text-white text-center my-3'>Password Creator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-3'>

      
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}

      />
      <button
      onClick={copyToClipBoard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
         <input
         type="checkbox"
         defaultChecked={numberAllowed}
         id="numberInput"
         onChange={()=>{
          setNumberAllowed((prev)=>!prev);
         }}
        />

      <label htmlFor='numberInput'>Number</label>
      </div>


      <div className='flex items-center gap-x-1'>
         <input
         type="checkbox"
         defaultChecked={charAllowed}
         id="numberInput"
         onChange={()=>{
          setCharAllowed((prev)=>!prev);
         }}
        />
 <label htmlFor='numberInput'>Character</label>
      </div>
      </div>
    </div>
    </div>
     </>
  )
}

export default App

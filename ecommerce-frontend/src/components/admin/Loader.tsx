import { TailSpin } from "react-loading-icons"

const Loader = () => {
  return (
<div className='backgco h-screen w-screen flex items-center justify-center'>
  <TailSpin 
    className="w-[150px] h-[150px]" 
    fill="#166E94" 
  />
</div>

  )
}

export default Loader
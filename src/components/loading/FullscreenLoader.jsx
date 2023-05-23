import {ImSpinner3} from 'react-icons/im'

function FullscreenLoader() {
    return ( 
        <div
          className='w-full h-screen fixed z-10 p-3 bg-neutral-500/60 flex justify-center items-center'>
          <div className='text-white animate-spin'>
            <ImSpinner3 size={25} />
          </div>
        </div>
     );
}

export default FullscreenLoader

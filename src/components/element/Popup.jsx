function Popup({children}) {
    return ( 
        <div 
        onClick={(e) => {
            e.stopPropagation()
        }}
        className="bg-white translate-x-5 border-[1px] z-10 border-neutral-200 translate-y-5 shadow-md w-full  absolute p-1 px-2 rounded">
            {children}
        </div>
     );
}

export default Popup;
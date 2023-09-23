function OverlaySpinner() {
 
    return (
      <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-gray-900 z-50`}>
        <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#C6151D]"></div>
              </div>
        </div>
      </div>  
    )
  }
   
  export default OverlaySpinner
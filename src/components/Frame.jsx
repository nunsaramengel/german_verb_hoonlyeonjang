import React, { useState, useEffect } from 'react'

const Frame = ({ children }) => {
    
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const handleResize = () => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const getDeviceType = () => {
        const { width } = screenSize;
        if (width < 768) {
            return 'Mobile';
        } else if (width < 1024) {
            return 'Tablet';
        } else { 
            return 'Desktop';
        }
    }

  return (
      <div>
          {children}
      </div>
  )
}

export default Frame
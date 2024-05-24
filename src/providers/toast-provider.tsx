'use client'

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'

interface ToastProviderProps {
  children: React.ReactNode
}

export async function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <div className="absolute top-0 right-0 ">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  )
}

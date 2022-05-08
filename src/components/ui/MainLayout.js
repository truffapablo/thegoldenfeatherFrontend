import React from 'react'

export const MainLayout = () => {
  return (
    <div className='container-fluid'>
    <div className='container'>
        <div className='row'>
            <div className='col-md-3'>
                <p>SideBar</p>
            </div>
            <div className='col-md-9'>
                <p>Main Content</p>
            </div>
        </div>
    </div>
    </div>
  )
}

import React from 'react'
import awardBook from '../assets/awardbooks (1).png'

function PromoBanner() {
  return (
    <>
    <div style={{backgroundColor:'lightcoral'}} className='mt-4'>
        <div className='row'>
            <div className='col-lg-1'></div>
            <div className='col-lg-7 mt-5 text-center'>
                <h2 className='fw-bold p-1'>2024 NATIONAL BOOK AWARDS FOR FICTIONS</h2>
            </div>
            <div className='col-lg-4 text-center'>
                <img style={{width:"70%"}} src={awardBook} alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default PromoBanner
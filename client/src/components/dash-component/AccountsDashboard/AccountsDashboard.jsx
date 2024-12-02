import React, { useState } from 'react'
import IncentiveForm from '../../IncentiveForm/IncentiveForm'
import IncentiveTable from '../../IncentiveTable/IncentiveTable'

const AccountsDashboard = () => {

  const [incentiveFormShow, setIncentiveFormShow] = useState(false)
  const [incentiveFormData, setIncentiveFormData] = useState()
  

  return (
    <div className="flex h-screen bg-gray-100 w-[100%]">

      <h1 className='text-3xl'>Dashboard</h1>

      {/* <div>
        {incentiveFormShow ? <IncentiveForm setIncentiveFormShow={setIncentiveFormShow} incentiveFormData={incentiveFormData} /> : <></>}
      </div>

      Main Content

      <div className="p-6 w-[100%]">
        Current Tasks
        <IncentiveTable setIncentiveFormShow={setIncentiveFormShow} setIncentiveFormData={setIncentiveFormData} />
      </div> */}

    </div>
  )
}

export default AccountsDashboard
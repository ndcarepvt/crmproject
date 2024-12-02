import React, { useState } from 'react'
import IncentiveForm from '../../IncentiveForm/IncentiveForm'
import IncentiveTable from '../../IncentiveTable/IncentiveTable'

const SalesDashbord = () => {

    const [incentiveFormShow, setIncentiveFormShow] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100 w-[100%]">

            <h1 className='text-3xl'>Dashboard</h1>

            {/* <div>
                {incentiveFormShow ? <IncentiveForm setIncentiveFormShow={setIncentiveFormShow} /> : <></>}
            </div>

            <Header />

            <div className="p-6 w-[100%]">
                Current Tasks
                <IncentiveTable setIncentiveFormShow={setIncentiveFormShow} />
            </div> */}

        </div>
    )
}

export default SalesDashbord
import React, { useState } from 'react'
import IncentiveForm from '../../IncentiveForm/IncentiveForm'
import IncentiveTable from '../../IncentiveTable/IncentiveTable'

const AdminDashboard = () => {
    const [incentiveFormShow, setIncentiveFormShow] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">

            <div>
                {incentiveFormShow ? <IncentiveForm setIncentiveFormShow={setIncentiveFormShow} /> : <></>}
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* <Header /> */}

                <div className="p-6">
                    {/* Current Tasks */}
                    <IncentiveTable setIncentiveFormShow={setIncentiveFormShow} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
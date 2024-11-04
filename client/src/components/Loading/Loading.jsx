import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-transparent"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#6A9C89] animate-spin">
                </div>
            </div>
        </div>
    )
}

export default Loading
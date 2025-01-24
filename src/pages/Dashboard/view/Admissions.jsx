import React, { useState } from 'react'
import AdmissionCard from '../../../components/AdmissionCard'
import StatusTrackerTest from '../../../components/StatusTrackerTest'

const Admissions = ({
  admissions
}) => {
  const [selectedIndex, setSelected] = useState(0)
  const [selectedAdmission, setSelectedAdmission] = useState(null)

  const handleSelectedAdmission = (item, selectedIndex) => {
    console.log(selectedIndex)
    console.log(item)
    setSelected(selectedIndex)
    setSelectedAdmission(item)
  }

  return (
    // Admission Content Container
    <div className='flex min-w-full max-w-full h-[85vh]'>
      {/* Left Side admission card */}
      <div className='w-[40%] overflow-y-auto '>
        {admissions.map((item, idx) => {

          // Check if selectedAdmission is empty for first render
          if(!selectedAdmission){
            setSelectedAdmission(item)
          }

          return (
            <AdmissionCard 
              key={idx}
              data={item}
              onClick={() => handleSelectedAdmission(item, idx)}
              active={idx === selectedIndex}
            />
          )
        })}
      </div>

      {/* Right Side admission status */}
      <div className='w-[60%] border-l border-l-black overflow-y-auto'>
        {/* Admission Status */}
        <StatusTrackerTest data={selectedAdmission || {}} selectedAdmissionIndex={selectedIndex}/>
      </div>
    </div>
  )
}

export default Admissions
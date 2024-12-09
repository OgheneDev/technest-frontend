import React from 'react'

const DetailsTable = () => {
  return (
    <div>
      <h2 className='text-grey-dark text-3xl mb-5 font-bold'>Details</h2>
      <div className='bg-bs-light text-[18px]  uppercase p-3  mb-3'>Specifications</div>
      <table>
         <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium text-gray-700">Colors</td>
              <td className="py-2 ">Multiple color options available</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-gray-700">Compatibility</td>
              <td className="py-2 ">Galaxy A35 5G</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-gray-700">Dimensions</td>
              <td className="py-2 ">Precisely tailored to fit the Galaxy A35 5G</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-gray-700">Material</td>
              <td className="py-2 ">High-quality silicone</td>
            </tr>
            <tr>
              <td className="py-2 font-medium text-gray-700">Weight</td>
              <td className="py-2 ">Lightweight design for everyday use</td>
            </tr>
         </tbody>
      </table>
    </div>
  )
}

export default DetailsTable


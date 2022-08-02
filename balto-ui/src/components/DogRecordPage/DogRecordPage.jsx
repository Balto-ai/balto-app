import React from 'react'
import { Route, Routes, useParams } from "react-router-dom"
import { DogRecordDetailContextProvider } from "../../contexts/dog-record-detail"
import DogRecordDetail from '../DogRecordDetail/DogRecordDetail'
import EditDogRecord from '../EditDogRecord/EditDogRecord'
import NotFound from '../NotFound/NotFound'

export default function DogRecordPageContainer() {
    return (
      <DogRecordDetailContextProvider>
        <DogRecordPage />
      </DogRecordDetailContextProvider>
    )
  }
  
  export function DogRecordPage() {
    return (
      <div className="dog-record-page">
        <Routes>
            <Route path="/" element={
                <DogRecordDetail />} />
            <Route path="/edit" element={
                <EditDogRecord />} />
            <Route path="/*" element={
                <NotFound />} />
        </Routes>
      </div>
    )
  }
  


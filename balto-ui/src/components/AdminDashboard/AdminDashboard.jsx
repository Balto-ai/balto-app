import React from 'react'
import { Route, Routes } from "react-router-dom"
import { DogRecordsContextProvider } from "../../contexts/dog-records"
import ShelterOverview from '../ShelterOverview/ShelterOverview'
import AddDogRecord from '../AddDogRecord/AddDogRecord'
import DogRecordDetail from '../DogRecordDetail/DogRecordDetail'
import NotFound from '../NotFound/NotFound'
import './AdminDashboard.css'

export default function AdminDashboardContainer() {
  return (
    <DogRecordsContextProvider>
      <AdminDashboard />
    </DogRecordsContextProvider>
  )
}

export function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Routes>
        <Route path="/" element={
          <ShelterOverview />} />
        <Route path="/add-record" element={
          <AddDogRecord />} />
        <Route path="/id/:dogId" element={
          <DogRecordDetail />} />
        <Route path="/*" element={
          <NotFound />} />
      </Routes>
    </div>
  )
}

import React from 'react'
import { InputFormDateTime } from './InputFormDateTime'
import { InputFormGuest } from './InputFormGuest'
import { InputFormPeopleAndRoomNumber } from './InputFormPeopleAndRoomNumber'
import { InputFormPriceAndCommision } from './InputFormPriceAndCommision'

export const InputFormDataReservation = ({formValues, handleInputChange}) => {

    const { firstName, lastName, date, peopleQuantity, roomNumber, time, email, phone, price, commission} = formValues;

  return (
    <>
    <InputFormGuest
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        handleInputChange={handleInputChange}
    />
    <InputFormDateTime
        date={date}
        time={time}
        handleInputChange={handleInputChange}
    />
    <InputFormPeopleAndRoomNumber
        peopleQuantity={peopleQuantity}
        roomNumber={roomNumber}
        handleInputChange={handleInputChange}
    />
    <InputFormPriceAndCommision
        price={price}
        commission={commission}
        handleInputChange={handleInputChange}
    />
    </>
  )
}

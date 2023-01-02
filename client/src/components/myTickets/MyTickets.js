import React from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase/config'

const MyTickets = () => {
    const navigate = useNavigate()
    if (!auth.currentUser) {
        navigate('/')
    }

  return (
    <div>MyTickets</div>
  )
}

export default MyTickets
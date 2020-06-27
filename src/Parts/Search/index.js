import React, { useRef } from 'react'
import { Form } from '@unform/web'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import Input from '../../components/InputFind'
import './styles.css'

function Find() {
  const formRef = useRef(null)

  async function handleSubmit(data) {
    try {
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return(
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input 
        name="search"
        placeholder="Pesquise por título ou autor"
      />
      <AiOutlineClose size={30} className="close" color="rgb(32, 27, 27)" />
      <button className="buttonSearch" type="submit">
        <AiOutlineSearch size={30} color="rgb(32, 27, 27)" />
      </button>
    </Form>
  )
}

export default Find
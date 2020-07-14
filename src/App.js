import React, { useRef, useState } from 'react';
import axios from 'axios'
import { Form } from '@unform/web'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import Input from './components/InputFind'
import LoadingAnimation from './components/loading'
import './Global.css';
import { useEffect } from 'react';

function App() {
  const formRef = useRef(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  let isLoading = ''

  async function showClearButton() {
    document.querySelector('.close').style.display = "block"
  }

  async function clearInput(formRef) {
    formRef.current.reset()
    document.querySelector('.close').style.display = "none"
  }

  async function handleSubmit(data) {
    try {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${data.search}`).then(response => {
        setBooks(response.data.items)
      })
      setLoading(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setLoading(false)
    document.querySelector('.resultsBooks').style.display = 'grid'
  }, [books])

  if(loading === true) (
    isLoading = (
    <div className="load">
      <LoadingAnimation/>
    </div>
    )
  )

  if(loading === true) (
    document.querySelector('.resultsBooks').style.display = 'none'
  )

  return(
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input 
          name="search"
          placeholder="Pesquise por título ou autor"
          onChange={showClearButton}
        />
        <AiOutlineClose size={30} className="close" color="rgb(32, 27, 27)" onClick={() => clearInput(formRef)} />
        <button className="buttonSearch" type="submit">
          <AiOutlineSearch size={30} color="rgb(32, 27, 27)" />
        </button>
      </Form>
      
      <div className="resultsBooks">
        {books.map(book => (
          <div className="infoBook" key={book.id}>
            <div className="cardImage">
              <img src={
                book.volumeInfo.readingModes.image === false
                ? "https://neocultura.com.br/wp-content/uploads/2018/06/imagem_indisponivel.png"
                : `${book.volumeInfo.imageLinks.thumbnail}`
              } alt={book.volumeInfo.title} />
            </div>
            <div className="cardInfo">
              <a href={book.volumeInfo.infoLink} rel="noopener noreferrer" target="_blank" className="title">{book.volumeInfo.title}</a>
              <p className="authors"><strong>Autor:</strong> {book.volumeInfo.authors || 'Sem informação'}</p>
              <p className="published"><strong>Publicado em:</strong> {book.volumeInfo.publishedDate || 'Sem informação'}</p>
              <p className="subtitle">{book.volumeInfo.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoading}
    </>
  )
}

export default App;

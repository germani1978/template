import { useState } from 'react'
import { useUsers } from './hooks/users';
import { Header } from './components/Header';
import { Table } from './components/Table';
import './App.css'

function App() {
  const [colorBand, setColorBand] = useState(false);
  const { setQuery, loading, error, changeOrder, filterCountryByQuery, query, deleteUser, reset } = useUsers()

  function changeBands() {
    setColorBand(!colorBand);
  }

  function resetAll() {
    reset()
    setColorBand(false);
  }

  return (
    <main>
      {error && <h1>Error al cargar</h1>}
      {!error && loading && <h1>Cargando..</h1>}
      {!error && !loading && <>
        <Header changeBands={changeBands} changeOrder={changeOrder} resetAll={resetAll} setQuery={setQuery} query={query} />
        <Table users={filterCountryByQuery(query)} colorBand={colorBand} changeOrder={changeOrder} deleteUser={deleteUser} />
      </>}
    </main>
  )
}

export default App

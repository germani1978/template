import ORDER from '../const/const';
import './Header.css'

interface Props {
  changeBands: () => void
  changeOrder: (value: ORDER) => void
  resetAll: () => void
  setQuery: (value: string) => void
  query: string
}

export const Header = ({ changeBands, changeOrder, resetAll, setQuery, query }: Props) => {

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return <div className="header">
    <button onClick={() => changeBands()}>Colorear</button>
    <button onClick={() => changeOrder(ORDER.BY_COUNTRY)}>Ordenar por pais</button>
    <button onClick={() => resetAll()}>Reset</button>
    <input type="text" placeholder="Buscando..." onChange={handleInput} value={query} />
  </div>;
};

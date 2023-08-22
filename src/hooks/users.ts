import { useState, useEffect, useRef } from "react";
import { User } from "../types";
import ORDER from "../const/const";

export const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const initUsers = useRef<User[]>([]);
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [order, setOrder] = useState(ORDER.NONE)
    const [query, setQuery] = useState<string>("");
  
    useEffect(() => {
      setLoading(true)
      fetch('https://randomuser.me/api/?results=7&seed=gba')
        .then(res => {
          if (!res.ok) throw Error('Error al cargar')
          return res.json()
        })
        .then(data => {
          setUsers(data.results)
          initUsers.current = data.results
        })
        .catch(err => {
          console.log(err.message);
          setError(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }, [])
  
    //borrar usuario
    function deleteUser(id: string) {
      setUsers([...users].filter(user => user.login.uuid !== id))
    }
  
    //cambiar el orden
    function changeOrder(newOrder: ORDER) {
      if (order === newOrder) setOrder(ORDER.NONE);
      else setOrder(newOrder);
    }
  
    //lista de usuarios ordenados por nombre, apellidos o pais
    function usersOrdered() {
      if (order === ORDER.BY_NAME) return [...users].sort((u1, u2) => u1.name.first.localeCompare(u2.name.first));
      if (order === ORDER.BY_LAST) return [...users].sort((u1, u2) => u1.name.last.localeCompare(u2.name.last));
      if (order === ORDER.BY_COUNTRY) return [...users].sort((u1, u2) => u1.location.country.localeCompare(u2.location.country));
      return [...users];
    }
  
    //filtra por query en paises
    function filterCountryByQuery(query: string) {
      return usersOrdered().filter(user => user.location.country.toLowerCase().includes(query.toLowerCase()));
    }
  
    //reinicia todo los estados
    function reset() {
      setUsers(initUsers.current)
      setQuery("")
      setOrder(ORDER.NONE)
    }
  
    return { setQuery, loading, error, changeOrder, filterCountryByQuery, query, deleteUser, reset }
  }
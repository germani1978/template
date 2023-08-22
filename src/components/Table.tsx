import "./Table.css";
import { type User } from "../types.d";
import ORDER from "../const/const";

interface Props {
  users: User[];
  colorBand: boolean,
  changeOrder: (value: ORDER) => void
  deleteUser: (i: string) => void
}



export const Table = ({ users, colorBand, changeOrder, deleteUser }: Props) => {

  const handleName = () => {
    changeOrder(ORDER.BY_NAME)
  }
  const handleLast = () => {
    changeOrder(ORDER.BY_LAST)
  }
  const handleCountry = () => {
    changeOrder(ORDER.BY_COUNTRY)
  }
  const handleDelete = (id: string) => {
    deleteUser(id)
  }


  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <p>Photo</p>
          </th>
          <th>
            <button onClick={handleName}>Name</button>
          </th>
          <th>
            <button onClick={handleLast}>Last</button>
          </th>
          <th>
            <button onClick={handleCountry}>Country</button>
          </th>
          <th>
            <p>Action</p>
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.login.uuid} className={colorBand ? (index % 2 === 0) ? "grisclaro" : "grisoscuro" : ""}>
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first} />
            </td>
            <td>
              <p>{user.name.first}</p>
            </td>
            <td>
              <p>{user.name.last}</p>
            </td>
            <td>
              <p>{user.location.country}</p>
            </td>
            <td>
              <button onClick={() => handleDelete(user.login.uuid)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>)
};

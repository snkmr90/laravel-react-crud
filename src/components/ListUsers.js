import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import http from "../http"
import swal from 'sweetalert2';
import Pagination from "react-js-pagination";

const ListUsers = () => {
    const [users,setUsers] = useState({
        userData : '',
    })
    useEffect(() =>{
        fetchUsers();
    },[]);
    const fetchUsers = ( pageNumber = 1)=>{
        
        http.get('/user?page='+pageNumber).then(res=>{
            setUsers({
            userData : res.data,
            })
            //console.log(users);
        })
    }
    const deleteUser = async (id) => {
        const isConfirm = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await http.delete(`user/${id}`).then(({data})=>{
            swal.fire({
                icon:"success",
                text:data.message
            })
            fetchUsers()
          }).catch(({response:{data}})=>{
            swal.fire({
                text:data.message,
                icon:"error"
            })
          })
        }
    return (
        <div>
            list users
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
            //console.log(users.userData.data)
            users.userData.data?users.userData.data.map((user,index)=>(
            <tr key = {user.id}>
                <td>{++index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><Link className="btn btn-xs btn-success" to={'/edit/'+user.id}>Edit</Link> 
                <button className="btn btn-xs btn-danger" onClick={()=>deleteUser(user.id)}>Delete</button></td>
            </tr>
            )):null
            } 
            </tbody>
            </table>
            <Pagination
                                    activePage={users.userData.current_page ? users.userData.current_page : 0}
                                    itemsCountPerPage={users.userData.per_page?users.userData.per_page : 0 }
                                    totalItemsCount={users.userData.total?users.userData.total : 0}
                                    onChange={(pageNumber) => {
                                        fetchUsers(pageNumber)
                                    }}
                                    pageRangeDisplayed={8}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First Page"
                                    lastPageText="Last Lage"
                                />
        </div>
    )
}
export default ListUsers 
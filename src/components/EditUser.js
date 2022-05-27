import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import {
    useParams
} from "react-router-dom";
import swal from 'sweetalert';
import http from '../http';
const EditUser = () => {
    let { id } = useParams();
    const [state, setState] = useState({
        name: '',
        email: '',
        errors: [],
        notfound: false,
        userSaved: false,
    })
    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = () => {
        http.get('/user/' + id).then(res => {
            setState({
                name: res.data.name,
                email: res.data.email,
                errors:[]
            });
        })
            .catch(res => {
                if (res.response.status == 404) {
                    setState({
                        name: '',
                        email: '',
                        errors: [],
                        notfound: true,
                        userSaved: false
                    });
                    //return <Navigate to = {{ pathname: "/" }} />;            
                }
            })
    }
    const handleInput = (e) => {
        setState(preState => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }
    const saveUser = async (e) => {
        e.preventDefault();
        let res = await http.patch('/user/' + id, state);
        if (res.data.success === false) {
            setState({
                errors: res.data.errors,
                name: res.data.inputs.name?res.data.inputs.name:'',
                email: res.data.inputs.email?res.data.inputs.email:'',
            })
        } else {
            swal({
                title: 'success!',
                text: res.data.message,
                icon: 'success',
                button: 'ok!'
            })
            setState({
                name: '',
                email: '',
                errors: [],
                userSaved: true
            });
        }
    }
    if (state.notfound || state.userSaved) {
        return <Navigate to={{ pathname: "/" }} />;
    }
    return (
        <div className="card col-md-4">
            <form>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text"
                        className="form-control" name="name" id="name" aria-describedby="helpId" placeholder=""
                        value={state.name}
                        onChange={handleInput}
                    />
                    <span className="text-danger">{state.errors.name}</span>
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email"
                        className="form-control" name="email" id="email" aria-describedby="helpId" placeholder=""
                        value={state.email}
                        onChange={handleInput}
                    />
                    <span className="text-danger">{state.errors.email}</span>
                </div>

                <button className="btn btn-xs btn-success mt-2" onClick={saveUser}>Update</button>
            </form>
        </div>
    )
}
export default EditUser 
import React, { Component} from "react";
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import http from'../http';
class CreateUser extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        errors: [],
        userSaved : false 
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    saveUser = async (e) => {
        e.preventDefault();
        const res = await http.post('/user',this.state);
        if(res.data.success === false){
            this.setState({
                errors : res.data.errors,
        })
        }else{
            swal({
                title:'success!',
                text:res.data.message,
                icon: 'success',
                button : 'ok!'
            })
            this.setState({
                name: '',
                email: '',
                password: '',
                errors:[],
                userSaved: true
            });
        }
    }
    render(){
        if (this.state.userSaved) {
            return <Navigate to = {{ pathname: "/" }} />;
          }
    return (
        <div className="card col-md-4">
        <form>
            <div className="form-group">
                <label >Name</label>
                <input type="text"
                className="form-control" name="name" id="name" aria-describedby="helpId" placeholder=""
                value={this.state.name} 
                onChange={this.handleInput}
                />
                <span className="text-danger">{this.state.errors.name}</span>
            </div>
            <div className="form-group">
                <label >Email</label>
                <input type="email"
                className="form-control" name="email" id="email" aria-describedby="helpId" placeholder="" 
                value={this.state.email} 
                onChange={this.handleInput}
                />
                <span className="text-danger">{this.state.errors.email}</span>
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password"
                className="form-control" name="password" id="password" aria-describedby="helpId" placeholder=""  value={this.state.password}
                onChange={this.handleInput}
                />
                <span className="text-danger">{this.state.errors.password}</span>
            </div>
            
            <button className="btn btn-xs btn-success mt-2" onClick={this.saveUser}>Create</button>
            </form>
        </div>
    )
    }
}
 export default CreateUser 
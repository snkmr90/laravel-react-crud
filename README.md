#import { Component } from 'react' , axios from 'axios'
#create class extending component
#create state object assign all input name empty as { key : value }
#create inputhandler function so that when some feild change it will update state. using this.setSate([e.target.name] = e.target.value)
#make a async function to handle submission which will create wait axios request with this.state object as parameters.
#check if response is sucess or not. if success empty state object values. this.setState({ 'key' : '' }) and show message in swal. if not success this.setState({errors:res.data.errors}) and define errors key in state object above with array assignment.
#create render method with return inside to show html
#for using error message use this.state.errors.keyname
export default componentName in last
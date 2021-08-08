import React, { Component } from 'react';
import axios from 'axios'


class PostData extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = { 
            title:'',
            content:''
         }

    }
    onChangeTitle(e) {
        this.setState({ title: e.target.value });
      }
    onChangeContent = (e) => {
        this.setState({content:e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault ()
        const post = {
            title:this.state.title,
            content:this.state.content
        }
        
    
            const response =  fetch("http://127.0.0.1:5000/add", {
                method: "POST",
                headers: {
                'Content-Type' : 'application/json'
                },
                body: JSON.stringify(post)
                })
                if (response.ok){
                 console.log("it worked")
                }
    }
    render() { 
        return ( 
            <div className="container">
                <div className='card'>
                    <form onSubmit={this.onSubmit} >
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" value={this.state.title} onChange={this.onChangeTitle} id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Title</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea rows="8" class="form-control" value={this.state.content} onChange={this.onChangeContent} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Content</label>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-md">Post</button>
                    </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default PostData;
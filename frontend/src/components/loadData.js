import React, { useEffect,useState } from 'react'
import moment from 'moment'
const LoadData = () => {
    const [articles,setArticles] = useState([]);
  useEffect(() => {
    fetch ('http://127.0.0.1:5000/',{
      'method':'GET',
      headers: {
        'content-type':'applications/json'
      }
    })
    .then ((resp) => resp.json())
    .then((resp) => setArticles(resp))
    .catch((err) => console.log(err))

  },[])
    return (
        <div className="container">
             {articles.map(article => {
        return (
          <div className="container" key = {article.id} > 
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <p>{moment(article.created_at).fromNow ()}</p>
          </div>
        )
      })}
        </div>
    )
}
export default LoadData;
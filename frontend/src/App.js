import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import LoadData from './components/loadData';
import PostData from './components/postData';

const App = () => {
  
  return (
    <div>
      <LoadData/>
      <PostData/>
    </div>
  )
}
export default App;
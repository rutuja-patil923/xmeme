import Header from "./components/Header"
import AddMeme from "./components/AddMeme"
import Memes from "./components/Memes"
import { useState } from 'react'


function App() {

  const [showMeme, setShowMeme] = useState(false)



  return (
    <>
      <div className="containers">
        <Header onAdd={() => setShowMeme(!showMeme)} showMeme={showMeme} title='X-Meme:)' />
        {showMeme && <AddMeme />}
      </div>
      <div className="containers second">
        <Memes/>
      </div>
    </>

  );
}

export default App;

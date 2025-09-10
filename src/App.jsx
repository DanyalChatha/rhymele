import Game from "./components/Game";

export default function App() {
  return(
    <div className="app">
      <h1>Rhymele <span><img className="logo" src="/microphone.png" alt="Rhymele Logo" /></span></h1>
      <p className='tip'>Guess a word that rhymes with the hint.</p>
      <Game />
    </div>
  )
}
import s from './App.module.scss'
import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../shared/lib/routes.ts";

function App() {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTES.PERSONAL_INFO);
  }

  return (
    <div  className={s.rootApp}>
      <button onClick={handleClick}>
        Start
      </button>
    </div>
  )
}

export default App

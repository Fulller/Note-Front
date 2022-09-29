import { createContext , useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import { PublicRoute } from './routes'

let GlobalContext = createContext()
let initState = {}
function reducer(state, [action,data]) {
    return true
}
function App() {
  let [globalState, dispacth] = useReducer(reducer,initState)
  return (
    <div className="App">
      <GlobalContext.Provider value={[globalState,dispacth]}>
        <Routes>
          {PublicRoute.map((route, index)=>{
              let path = route.path
              let Page = route.element
              return <Route key={index} path={path} element={<Page></Page>} ></Route>
          })}
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;

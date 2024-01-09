import React, { useState } from 'react'
import AddTask from './components/addTasks'
import TasksList from './components/listTasks'
import './App.css'

function App() {
  const [task, setTask] = useState([])

  return (
    <>
      <div>
        <h1 className='title'>TO DO LIST</h1>
      </div>
      <AddTask task={task} setTask={setTask}/>
      <TasksList task={task} setTask={setTask}/>
      <footer className='footerApp'>
        <div className='footerDiv'>
          <h3 className='footerTitle'>BY FRANCISCO ROBLES</h3>
          <div className='footerInfo'>
            <p>E-Mail Address: <a className='links' href="mailto:franciroble03@gmail.com">franciroble03@gmail.com</a></p>
            <p>Instagram: <a className='links' href='https://www.instagram.com/r__francisss/'>r__francisss</a></p>
            <p>Linkedin: <a className='links' href='https://www.linkedin.com/in/franci-robles-58518b263/'>Franci Robles</a></p>
            <p>GitHub: <a className='links' href='https://github.com/RFrancisL'>RFrancisL</a></p>
          </div>
        </div>
        <div className='footeerDescription'>
          <div className='description'>
            <h3 className='footerTitleD'>DESCRIPTION</h3>
            <p>Web Aplication developed with React-JS for a personal project. 
              The reason of his develop its improve the personal experience
              with React-JS</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

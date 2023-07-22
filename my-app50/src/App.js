import './App.css';
import React, { useState } from 'react';

function App() {
	// add value array tasks
	const [tasks, setTasks] = useState([
		{ id: 1, title: 'learn react - syntetic Event', isComplited: false },
		{ id: 2, title: 'learn react - routing', isComplited: false },
		{ id: 3, title: 'learn react - useState', isComplited: false }
	]);

	// add value input
	const [input, setInput] = useState('');
	//
	function todoIsFinished(id) {
		setTasks(
			tasks.filter((task) => {
				if (task.id === id) {
					task.isComplited = !task.isComplited;
				}
				return task;
			})
		)
	}

	function removeTask(id) {
		setTasks(
			tasks.filter((task) => task.id !== id)
		)
	}

	function addTask(e) {
		if (e.code === 'Enter' && input.length) {
			setTasks(tasks.concat([{ id: +tasks[tasks.length - 1].id + 1, title: input, isComplited: false }]))//+tasks.length.id + 1
			setInput('');
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<h3>
					ДЗ 50. Написати програму todo-list.For del task click to '-#-'';
				</h3>
			</header>
			<main className='wrapper'>
				<input
					type='text'
					value={input}
					onKeyUpCapture={(e) => addTask(e)}
					onChange={(e) => setInput(e.target.value)}
				></input>
				<div>
					{tasks &&
						tasks.map((task) => {
							return (
								<div key={task.id} className='listWrapper'>
									<input
										type='checkbox'
										onClick={() => todoIsFinished(task.id)}
									></input>
									<div
										style={{
											color: task.isComplited ? "red" : 'black'
										}}
									>
										{task.title}
									</div>
									<div className="close" onClick={() => removeTask(task.id)}> 	-#- </div>
								</div>
							)
						})
					}
				</div>
			</main>
		</div>
	);
}

export default App;

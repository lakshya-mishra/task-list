// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
   // DOM Load EVent
   document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event "EVENT DELEGATION AND BUBBLING" is used
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');

      // Add class
      li.className = 'collection-item';

      // Create textnode and append to the li
      li.appendChild(document.createTextNode(task));

      // Create new link for 'x' icon in the list
      const link = document.createElement('a');

      // Add class to link
      link.className = 'delete-item secondary-content';

      // Add icon to the link with adding <i></i> tag using innerHTML
      link.innerHTML = '<i class="fa fa-remove"></i>';

      // Append the link to the li
      li.appendChild(link);

      // Append the li to the ul
      taskList.appendChild(li);
   });
}

// Add task
function addTask(e){
	if(taskInput.value === ''){
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');

	// Add class
	li.className = 'collection-item';

	// Create textnode and append to the li
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link for 'x' icon in the list
	const link = document.createElement('a');

	// Add class to link
	link.className = 'delete-item secondary-content';

	// Add icon to the link with adding <i></i> tag using innerHTML
	link.innerHTML = '<i class="fa fa-remove"></i>';

	// Append the link to the li
	li.appendChild(link);

	// Append the li to the ul
   taskList.appendChild(li);
   
   // Store in local storage
   storeTaskInLocalStorage(taskInput.value);

	// Clear the input
	taskInput.value = '';



	e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are You Sure?')){
         e.target.parentElement.parentElement.remove();
         
         // Remove from local storage
         removeTaskFromLocalStorage( e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
         tasks.splice(index, 1);
      }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
	// taskList.innerHTML = '';
	
   // Faster
   
   while(taskList.firstChild){ //while there still is any firstChild
		taskList.removeChild(taskList.firstChild); //remove the firstChild if there is one
	}

   // Clear from LS
   clearTasksFromLocalStorage();

	//https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
}

// Clear tasksk from LS
function clearTasksFromLocalStorage(){
   localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
	// Search Value
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){ // Checking if item is present in the text or not and for that both should be lower case
			task.style.display = 'block';
		}else{
			task.style.display = 'none';
		}  
	});
 
}


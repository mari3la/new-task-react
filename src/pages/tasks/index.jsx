import React from "react";
import { Grid } from '@mui/material';
// components 
import CreateNewTask from "../../components/CreateNewTask";
import ListTask from "../../components/ListTask";


const styleBackground = {
  width: '100vw',
  padding: '5px',
  background:' #F1F2B5',  /* fallback for old browsers */
  background: '-webkit-linear-gradient(to right, #f06292, #fce4ec)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to top, #f06292, #fce4ec)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

};

function useLocalStorage(itemName, initialValue) {
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);

    setTimeout(() => {
        const localStorageItem = localStorage.getItem(itemName)
        let parsedItem;
        if(!localStorageItem) {
            localStorage.setItem(itemName, JSON.stringify(initialValue))
            parsedItem = initialValue
        } else {
            parsedItem = JSON.parse(localStorageItem)
        }
        setItem(parsedItem)
        setLoading(false)
    }, 1000);

    const saveItem = (newItem) => {
        const stringFieldItem = JSON.stringify(newItem)
        localStorage.setItem(itemName, stringFieldItem)
        setItem([...newItem])
    }

    return {item, saveItem, loading}
}

function Tasks() {
    const {item: tasks, saveItem: saveTasks, loading} = useLocalStorage('Tasks-V1', [])
    // const [name, saveName] = useLocalStorage('NAME-V1', 'Mariela')

    const [searchText, setSearchText] = React.useState('');
    const [filterTasks, setfilterTasks] = React.useState([ ...tasks ]);

    let allTask = []
    if(!searchText.length >= 2) {
        allTask = tasks
    } else {
        allTask = tasks.filter(item => {
            const allText = item.name.toLowerCase()
            const params = searchText.toLowerCase()
            return allText.includes(params)
        })
    };

    const handleFilterData = (data, text) => {
        const newData = data.filter((item) => {
            const itemDataName = item.name.toUpperCase()
            const params = itemDataName
            return params.indexOf(text.toUpperCase()) > -1
        })
        return newData
    }

    const handleFilterTask = (e) => {
        var text = e.target.value
		let newOrders = handleFilterData(tasks, text)
        setfilterTasks([ ...newOrders ])
		setSearchText(text)
    }

    const handleCleanSearch = () => {
        setfilterTasks([ ...tasks ])
        setSearchText('')
    }

  return (
    <div style={styleBackground}>
      <div className="container mx-auto rounded-xl p-8 m-10">
        {/* <p>{name}</p> */}
        <Grid container spacing={2} direction="row" justifyContent="start" alignItems="start" >
          {/** Create new Task */}
          <Grid item xs={12} sm={12} md={6}>
            <CreateNewTask tasks={tasks} saveTasks={saveTasks} />
          </Grid>
           {/** Show list Task */}
          <Grid item xs={12} sm={12} md={6}>
            <ListTask
                filterTasks={allTask}
                tasks={tasks}
                loading={loading}
                searchText={searchText}
                saveTasks={saveTasks}
                handleFilterTask={handleFilterTask}
                handleCleanSearch={handleCleanSearch}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Tasks;

//import { Component } from 'react'; this is for class component
import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import Searchbox from './components/search-box/search-box.component';
import './App.css';

//Functional component
//rend this whole function whenever it needs to re-render ex.props/state change
const App = () => {
  //console.log('render');

  //useState gives back array of two values
  //[value, setValue] value = a value we want to check if it's updated, setValue = a value we can call
  const [searchField, setSearchField] = useState(''); //initialize searchField an emtpy string
  const [title, setTitle] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters); //initialize the same value as monsters

  //1.callback function -> effect(function) that we want to happen
  //2.array of dependency -> contains different state values
  //whenever the array value of dependency change, callback function will be run
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') 
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []);
  //this case dependency is empty because only one time we want to call function

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);            
  }

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);            
  }

  console.log(monsters);

  return (
    <div className="App">
      <h1 className='app-title'>{title}</h1>

      <Searchbox
        className='monsters-search-box' 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'
      />

      <br />

      <Searchbox
        className='title-search-box' 
        onChangeHandler={onTitleChange} 
        placeholder='set title'
      />

      <CardList monsters={filteredMonsters}/>

    </div>
  )
}

//Class component
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//     //console.log('constructor');
//   }

//   //the moment a website is uploaded at first time
//   componentDidMount() {
//     //console.log('componentDidMount');
//     fetch('https://jsonplaceholder.typicode.com/users') 
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users}
//       },
//       /*() => {
//         console.log(this.state);
//       }*/
//       ));
//   }

//   onSearchChange = (event) => {
//     //console.log(event.target.value);
//     const searchField = event.target.value.toLocaleLowerCase();            
//     this.setState(() => {
//       return { searchField };
//     })
//   }  

//   render() {
//     //console.log('render from AppJs');

//     //set variables for this.state and this
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <Searchbox
//           className='monsters-search-box' 
//           onChangeHandler={onSearchChange} 
//           placeholder='search monsters'
//         />
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;

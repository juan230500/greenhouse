import React,{Component} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Card from './Components/Card/Card';

class App extends Component {
  state = {
    data:[
      {
        date:'17/3/2020',
        temp:'33.7',
        humidity:'75.6',
      },
      {
        date:'19/3/2020',
        temp:'39.7',
        humidity:'75.6',
      },
      {
        date:'21/3/2020',
        temp:'23.7',
        humidity:'75.6',
      }
    ]
  }

  render () {
    let data = this.state.data.map((item,index)=>(
      <Card
      date={item.date}
      temp={item.temp}
      humidity={item.humidity}
      key={index}></Card>
    ));

    return (
      <div className="App">
        <Header title="Datos del invernadero"></Header>
        <button>Actualizar</button>
        {data}
      </div>
    );
  }
}

export default App;

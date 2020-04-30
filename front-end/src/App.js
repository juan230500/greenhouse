import React,{Component} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Card from './Components/Card/Card';

class App extends Component {
  state = {
    data:[]
  }

  componentDidMount = () => {
    this.updateDateHandler();
  }

  updateDateHandler = () => {
    fetch('http://ec2-54-166-144-31.compute-1.amazonaws.com:3000/greenhouse')
    .then(response => response.json())
    .then(responseJson => {
      var newData = responseJson.result;
      console.log(newData);
      this.setState({data:newData})
    });

  }

  render () {
    let data = this.state.data.map((item,index)=>(
      <Card
      date={item.date}
      temperature={item.temperature}
      humidity={item.humidity}
      key={index}></Card>
    ));

    return (
      <div className="App">
        <Header title="Datos del invernadero"></Header>
        {data}
        <button onClick={this.updateDateHandler}>Actualizar</button>
      </div>
    );
  }
}

export default App;

import React ,{Component} from 'react'
import firebase, {db} from "./components/firebase"





class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
      data: null
    };
  }
   
  

  onInputChange = (e) => {
    const inputField = e.target.value;
    this.setState(() => ({ inputField }));
  }

  /* Adding Data */
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.inputField);

    db.collection('demo')
    .doc('pi2qOv9AgzX72soh05FfU74kULr2')
    .set({
      note: this.state.inputField
    })
    .then((docRef) => {
      console.log("Doc written with ID: ", firebase.auth().currentUser.uid)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  /* Retrieving Data */
  onLoad = (e) => {
    const docRef = db.collection('demo').doc('pi2qOv9AgzX72soh05FfU74kULr2');
         
         docRef.get()
        .then((doc) => {
        if (doc.exists) {
            let data = doc.data();
          
            this.setState({ data: data.note });
      
            console.log("Document data:", data);
            console.log("Document data:", data.note)
            
          } else {
            // doc.data() will be undefined in this case
            this.setState({ data: null });
            console.log("No such document!");
        }
    })
    .catch(function (error) {
  
        console.log("Error getting document:", error);
    });
    
}

  
render() {

  let dataUI = this.state.data ? <h1>No Data</h1> : <pre>{JSON.stringify(this.state.data)}</pre>;

  
  return (
      <div className="App">
          <h1>Raul: </h1>

          <div>
              <h1>UI Data</h1>
              
              {dataUI}
              
              
          </div>

                  

          <form onSubmit={this.onSubmit}>
              <input
                  type="text"
                  value={this.state.inputField}
                  onChange={this.onInputChange}
              />
              <button>Save</button>
          </form>
          <button onClick={this.onLoad}>Load Data</button>
      </div>

  );
}
}

export default App;

import React ,{Component} from 'react'
import "./App.css"
import firebase, {db} from "./components/firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"





class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputdata: '',
      data: null,
      isSignedIn: false
    };
  }
  uiConfig = {
    signInFlow: "popup",
    
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    
    callbacks: {
      signInSuccess: () => false
    }
  }
  componentDidMount = () => { 
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
   
  

  onInputChange = (e) => {
    const inputdata = e.target.value;
    this.setState(() => ({ inputdata }));
  }

  /* Adding Data */
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.inputdata);

    db.collection('demo')
    .doc(firebase.auth().currentUser.uid)
    .set({
      note: this.state.inputdata
    })
    .then((docRef) => {
      console.log("Doc written with ID: ", firebase.auth().currentUser.uid)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  /* Retrieving Data */
  readdata = (e) => {
    const docRef = db.collection('demo').doc(firebase.auth().currentUser.uid);
         
         docRef.get()
        .then((doc) => {
        if (doc.exists) {
            let data = doc.data();
          
            this.setState({ data: data.note });
            this.forceUpdate()
      
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

  let datauser = this.state.data ? <h1>{this.state.data}</h1> : <h1>No data</h1>;

  
  return (
      <div classname ="App">
        
        {this.state.isSignedIn ? (
          <span>
            <div>You are successfully signed in</div>
            
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Hello {firebase.auth().currentUser.displayName}</h1>
            <h1>Welcome to notes</h1>
            <p>Your note:{datauser}</p>
             <form onSubmit={this.onSubmit}>
               <div><p>Note :
              <input
                  type="text"
                  value={this.state.inputdata}
                  onChange={this.onInputChange}
              />
              </p>
              </div>
              <button>Save data</button>
              
          </form>
          <button onClick={this.readdata}>  Load Data</button>
          
            
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      
          
      </div>

  );
}
}

export default App;

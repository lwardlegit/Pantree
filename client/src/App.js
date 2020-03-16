import React, { Component } from 'react'
import Logo from './P.png';
import Map from './maps.png';
import Mobile from './mobile.png'
import GoogleIcon from './googleicon.png';
import squidwardFuture from './squidwardFuture.jpg';
import Me from './bigme.jpg';
import Button from 'react-bootstrap/Button';
import MobileInterface from './Mobile';
import Modal from 'react-bootstrap/Modal';
import './App.css';

export default class App extends Component {

  state={
    values:[],
    signedin:false,
    modal: false,
    start:false,
    sheetSelected:false,
    sheets: [
      {
        id: '1',
        name: 'plant sheet',
        data: 'sheetobj',
      },
      {
        id: '2',
        name: 'kitchen sheet',
        data: 'sheetobj',
      },
    ],

    storeHeader:{
      status: 'summary',
      warning: false,
    },
    stock: [
      {
        name: 'squash',
        dateEntered: '1/2/2020',
        category: 'veggie',
        expiration: 'fresh'
      },
      {
        name: 'squash',
        dateEntered: '1/2/2020',
        category: 'veggie',
        expiration: 'fresh'
      },
      {
        name: 'squash',
        dateEntered: '1/2/2020',
        category: 'veggie',
        expiration: 'fresh'
      },
      {
        name: 'squash',
        dateEntered: '1/2/2020',
        category: 'veggie',
        expiration: 'old'
      },
      {
        name: 'squash',
        dateEntered: '1/2/2020',
        category: 'veggie',
        expiration: 'fresh'
      },
    ],

    fetchedSheet: null,
    list: []
  }

  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  componentDidMount() {
    this.getList();
  }

  focusOnDiv=(target)=>{
    document.getElementById(`${target}`).focus()
  }

  sheetSelected = (sheetName) =>{
    fetch(`https://googleSheets/${sheetName}`) 
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      this.setState({fetchedSheet:data})
    })

    this.setState({sheetSelected:true})
  }


  interface = () =>{
    if(!this.state.sheetSelected){
      return(
        <div className = 'app'> 
        <header className = 'header'>
          <img src={Logo} width='80px' height='80px' alt='Pantree Logo'></img>
           <nav className='nav'>
             <a class='links' onClick={()=>{this.focusOnDiv('home')}} href="#home">home</a>
             <a class='links' onClick={()=>{this.focusOnDiv('how')}} href="#how">How it Works</a>
             <a class='links' onClick={()=>{this.focusOnDiv('future')}} href="#how">Future Plans</a>
             <a class='links' onClick={()=>{this.focusOnDiv('contact')}} href="#contact">Contact</a>
           </nav>
        </header>


        <div className='body'>
           <h5 class="intro">Try out Pantree here by signing into google</h5>
           <div className='googleSignin'>
               <div onClick={()=>{this.setState({modal: true})}} class="g-signin2" data-onsuccess="onSignIn"></div>
           </div>

          <div class="ribbon" id='home'>

            <div className='ribbonItem'>
              <p>SIGN INTO GOOGLE</p>
              <img class='ribbonIcons' src={GoogleIcon} alt=' a google icon'></img>
            </div>

            <div className='ribbonItem'>
               <p>VIEW ON MOBILE</p>
               <img class='ribbonIcons' src={Mobile} alt='view on mobile'></img>
            </div>

            <div className='ribbonItem'>
              <p>YOUR INVENTORY TALKS</p>
              <img class='ribbonIcons' src={Map} alt='your inventory talks'></img>
             </div>

          </div>
        
          <div className='how'>
         <h2 id="how">how it works</h2>

         <p className='boxContent'>
           All databases are fundamentally spreadsheets used to store information.
           Google sheets is a well known, free spreadsheet service which can be modified using
           google apps script a programming language that only runs on google's cloud.

           Pantree is an Express.js application programming interface that connects your google sheets data to your phone via your browser using the google sheets API and 
           a front end React.js web app (what you are seeing now).
           Pantree allows you to store data and even lets you call functions on your data.

           Additonally, Pantree writes google apps script for you that helps you track the freshness of your inventory items and let's you receive 
           real time alerts based on timers and GPS technology.

           Now your entire inventory can be viewed and edited in a simple app allowing you to perform record keeping on the go!
           GPS technology keeps track of where items were added. Pantree then sorts inventory by location allowing you to keep track
           of multiple food storages simultaneously.
         </p>
       </div>

       <div className='future'>
       <h2 id="future">Coming Soon</h2>
          <img src={squidwardFuture} width='115px' height='150px' alt='squidward doing the future pose'></img>
          <p className='boxContent'>
              We plan to add even more functionality to Pantree in the near future and we plan to release them on social media!
              so please follow us and our progress!
          </p>
       </div>

       <div class='contactUs' id='contact'>
         <h2>Contact Us</h2>

         <p>
           Please contact us with any questions.
         </p>
       </div>

        <div className='creator'>
         <h4>The Developer</h4>


       <div className = 'about'>

         <p style = {{marginBottom: '.3em'}}>Hi I'm Luther, Pantree's creator <br></br>
            <br></br>
           A web developer by trade, 
           I am also a hydroponics enthusiast who spent his time studying food inequity and it's impacts as a sociology major in my undergraduate degree.
           In my free time I like to put my talents to good use inventing technology that I believe can make a significant impact on non-profit organizations 
           and their efforts to aid their community.
           Pantree was designed with small pantry services in mind and provides a free usable interface for any organization to maximize
           the power of google apps scripts and server side technology to store their data in the cloud at no cost
           with a flexible simplistic interface that anyone can adapt to.
           If you'd like to learn more about my other projects you can check out my github below.</p>
           <div>
           <img class='me' src={Me} width='280px' height='250px' alt='a picture of luther the developer of Pantree'></img>
           </div>

           </div>


        </div>

           <div className='personalContact'>
             <Button variant="outline-success" className='githubBtn' href='https://github.com/lwardlegit'>My github</Button>
             <p className='myEmail'>lutherwardle@gmail.com</p>
         </div>


         

        </div>

        <footer className='footer'></footer>

        <Modal show={this.state.modal} >
                        <Modal.Header closeButton>
                          <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                              <Modal.Body>
                                    <div className='sheetSelector'>{this.state.sheets.map((sheet)=>{
                                        return(
                                          <div key={sheet.id}>
                                              <div onClick={()=>this.sheetSelected(sheet.name)}>{sheet.name}</div>
                                            </div>
                                        )
                                    })}</div>
                              </Modal.Body>

                      <Modal.Footer>
                            <Button onClick={()=>this.setState({modal:!this.state.modal})} variant="secondary">Close</Button>
                            <Button onClick={()=>this.setState({modal:!this.state.modal})} variant="primary">Save changes</Button>
                      </Modal.Footer>
                  </Modal>
     </div>

                  

      )
    } else{
      return(
        <MobileInterface stock = {this.state.stock} storeHeader = {this.state.storeHeader}/>
      )
    }
  }


  render() {
  return(
    <div>
      {this.interface()}
    </div>
  )
   
    
  }
}

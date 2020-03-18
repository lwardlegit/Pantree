import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

export default class Mobile extends Component {

    state={
        add: false
    }

    display = () =>{
        //choose whether to display the add or the summary
        if(!this.state.add){
            return(
                <div className='mContainer'>
                    <div className="mMode">
                        <h5 onClick={()=>this.setState({add:true})}>Add</h5>
                        <h5>Summary</h5>
                    </div>
                    

                <body className = 'mBody'>
                    <Button onClick={this.props.returnHome}>Return Home</Button>
                    {this.props.stock.map((collection,key)=>{
                        return(
                            <div className={`mStoreItem`} key={key}>
                            <div>{collection[0]} {collection[1]} {collection[2]} </div>
                            <Button className='btn-circle' variant="danger">-</Button>
                            </div>
                        )
                    })}
                </body>

                <footer className = 'mFooter'>
                    <p>Pantree</p>
                </footer>
            </div>
            )
        }else{
            return(
                <div className='mContainer'>
                    <div className="mMode">
                        <h5>Add</h5>
                        <h5 onClick={()=>this.setState({add:false})} >Summary</h5>
                    </div>

                <body className = 'mBody'>
                    the form goes here
                </body>

                <footer className = 'mFooter'>
                    <p>Pantree</p>
                </footer>
            </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.display()}
            </div>
        )
    }
}

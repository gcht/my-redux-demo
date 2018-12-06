import React from "react";
import {render} from 'react-dom';
import { createStore, bindActionCreators } from "redux";
import {Provider, connect} from 'react-redux';

function changeText(){
    return {
        type: 'changeTxt'
    }
}
function clickButton(){
    return {
        type: 'buttonClick'
    }
}


const initialState = {
    text: 'hello'
}

function myApp(state = initialState, actions){
    debugger;
    switch(actions.type){
        case 'changeTxt': return {
            text: state.text == 'hello'?'world':'hello'
        }
        case 'buttonClick': return {
            text: 'Yon click the button at ' + (new Date()).toLocaleString()
        }
        default:return{
            text:'hello'
        }    
    }
}


let store = createStore(myApp);


class TextChange extends React.Component {
    constructor(props){
        super(props);
        this.textChangeHandler=this.textChangeHandler.bind(this);
    }

    textChangeHandler(){
        debugger;
        this.props.actions.changeText();
    }

    render(){
        return <h1 onClick={this.textChangeHandler}>{this.props.text}</h1>
    }
}

class ButtonClick extends React.Component {
    constructor(props){
        super(props);
        this.buttonClickHandler=this.buttonClickHandler.bind(this);
    }

    buttonClickHandler(){
        debugger;
        this.props.actions.clickButton();
    }

    render(){
        return <button onClick={this.buttonClickHandler}>click me for change</button>
    }
}



class App extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const {actions, text} = this.props;
        return (
        <div>
            <TextChange  actions={actions} text = {text}></TextChange>
            <ButtonClick actions={actions}></ButtonClick>
        </div>
        )
        
    }
}




function mapState2Props(state){
    return {text:state.text};
}

function mapDispatch2Props(dispatch){
    return {
        actions: bindActionCreators({
            changeText:changeText,
            clickButton:clickButton
        },dispatch)
    }
}

App = connect(mapState2Props,mapDispatch2Props)(App)

render(
    <Provider store = {store}>
        <App></App>
    </Provider>, document.getElementById('root')
);
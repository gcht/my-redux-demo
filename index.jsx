import React from "react";
import {render} from 'react-dom';
import { createStore, bindActionCreators } from "redux";
import {Provider, connect} from 'react-redux';

//Action
function changeTextAction(){
    return {
        type: 'changeTxt'
    }
}
function clickButtonAction(){
    return {
        type: 'buttonClick'
    }
}



//----------------------- reducer -----------------------------------------

//最初状态
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
            text: '~~~ +-+ Yon click the button at ' + (new Date()).toLocaleString()
        }
        default:return{
            text:'hello'
        }    
    }
}




// --------------- Store -----------------------------------------------------
let store = createStore(myApp);


class TextChange extends React.Component {
    constructor(props){
        super(props);
        this.textChangeHandler=this.textChangeHandler.bind(this);
    }

    textChangeHandler(){
        debugger;
        this.props.txtHandlers();
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
        this.props.btnHandlers();
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
        const {handlers, text} = this.props;
   
        return (
        <div>
            <TextChange  txtHandlers={handlers.changeText} text = {text}></TextChange>
            <ButtonClick btnHandlers={handlers.clickButton}></ButtonClick>
        </div>
        )
        
    }
}




function mapState2Props123(state){
    return {
        text:state.text        
    };

}

function mapDispatch2Props_1(dispatch){
    return {
        handlers: bindActionCreators({
            changeText: changeTextAction,
            clickButton: clickButtonAction
        },dispatch)
    }
}

function mapDispatch2Props_2(dispatch){
    return {
        handlers: {
            changeText: ()=>dispatch(changeTextAction()),
            clickButton: ()=>dispatch(clickButtonAction())
        }
    }
}

//---------------------------------------------------------------------

App = connect(mapState2Props123,mapDispatch2Props_1)(App)
//App = connect(mapState2Props123,mapDispatch2Props_2)(App)

render(
    <Provider store = {store}>
        <App></App>
    </Provider>, document.getElementById('root')
);
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      runningTotal: 0,
      subTotal: 0,
      displayVal: 0,
      priorOperand: '+',
      currentOperand: '+',
      lastKeyType: '',
    };
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
    
  }
  
  handleClick(event) {
    
    let rt = this.state.runningTotal;
    let st = this.state.subTotal;
    let co = this.state.currentOperand;
    let po = this.state.priorOperand;
    let dv = this.state.displayVal;
    let evt = event.target.value;
    let lkt = this.state.lastKeyType;
    
    breakable: if (event.target.value === 'C') {
      this.setState({ 
        runningTotal: 0,
        subTotal: 0,
        displayVal: 0,
        priorOperand: '+',
        currentOperand: '+',
        lastKeyType: '',
      });
    } else if 
      
      (event.target.value === 'plusmin') {
        
        if (dv != 0) {
          dv = dv * -1;
        } 
    
      this.setState({ 
          displayVal: dv,
      });
    } else if 
      
      (event.target.value === '%') {
      
      dv = dv / 100;
      
      this.setState({ 
          displayVal: dv,
      });
      
    } else if
      
      (event.target.value === '=') { 
        
        if (lkt === 'eq') {
          break breakable 
        }
        
        if (rt != 0 && st == 0) {
          dv = eval(rt + co + dv);
        } else if (rt == 0 && st != 0) {
          dv = eval(st + co + dv);
        } else if (rt != 0 && st != 0) {
          dv = eval(rt + po + (st + co + dv));
        }
        
        this.setState({ 
          displayVal: dv,
          runningTotal: 0,
          subTotal: 0,
          priorOperand: '+',
          currentOperand: '+',
          lastKeyType: 'eq',
      });

   } else if 
      
      (evt === '.') {
        if (dv.toString().includes('.')) {
          break breakable 
        }
        
        if (lkt === 'oper') {
          dv = "0" + evt;
        } else {
          dv = dv + evt;
        }
        
        this.setState({ 
        displayVal: dv,
        lastKeyType: 'num',
        });

   } else if       
      
      (/^([0-9])$/.test(event.target.value)) {
        let dv = this.state.displayVal;
        
        if (lkt === 'num' && dv !== "0") {
          dv = dv + evt;
        } else if (lkt === 'eq') {
          dv = evt;
          rt = 0;
          st = 0;
        } else {
          dv = evt;
        }
        
        this.setState({ 
          displayVal: dv,
          runningTotal: rt,
          subTotal: st,
          lastKeyType: 'num',
        });
    } else if 
      
      (["+","-"].includes(event.target.value)) {

        if (lkt === 'oper') {
          break breakable;
        }
        
        st 
          ? rt 
            ? po === "-"
              ? rt = eval(rt + po + dv + co + st)
              :rt = eval(st + co + dv + po + rt) 
            : rt = eval(st + co + dv)
          : rt = eval(rt + co + dv)
        
        dv = rt;
      
      this.setState({
        priorOperand: co, 
        currentOperand: evt,
        runningTotal: rt,
        displayVal: dv,
        lastKeyType: 'oper',
        subTotal: 0,  
      });
        
    } else if 
      
      (["*","/"].includes(evt)) {
        
        if (lkt === 'oper') {
          break breakable;
        }

        st 
          ? st = eval(st + co + dv)
          : st = dv
        
        this.setState({
        priorOperand: co,
        currentOperand: evt,
        subTotal: st,
        displayVal: st,
        lastKeyType: 'oper',
      });
    }
  }
    
  render() {
    return (
      <div className = "calc-body">
        <Screen value={ this.state.displayVal }/>
        
        <Button onClick={ this.handleClick } klass="btns" value="C" text="C" />
        <Button onClick={ this.handleClick } klass="btns" value="plusmin" text="&plusmn;" />
        <Button onClick={ this.handleClick } klass="btns" value="%" text="%" />
        <Button onClick={ this.handleClick } klass="btns" value="/" text="/" />
        <Button onClick={ this.handleClick } klass="btns" value="7" text="7" />
        <Button onClick={ this.handleClick } klass="btns" value="8" text="8" />
        <Button onClick={ this.handleClick } klass="btns" value="9" text="9" />
        <Button onClick={ this.handleClick } klass="btns" value="*" text="x" />
        <Button onClick={ this.handleClick } klass="btns" value="4" text="4" />
        <Button onClick={ this.handleClick } klass="btns" value="5" text="5" />
        <Button onClick={ this.handleClick } klass="btns" value="6" text="6" />
        <Button onClick={ this.handleClick } klass="btns" value="-" text="-" />
        <Button onClick={ this.handleClick } klass="btns" value="1" text="1" />
        <Button onClick={ this.handleClick } klass="btns" value="2" text="2" />
        <Button onClick={ this.handleClick } klass="btns" value="3" text="3" />
        <Button onClick={ this.handleClick } klass="btns" value="+" text="+" />
        <Button onClick={ this.handleClick } klass="btns zero" value="0" text="0" />
        <Button onClick={ this.handleClick } klass="btns" value="." text="." />
        <Button onClick={ this.handleClick } klass="btns" value="=" text="=" />
      </div>
    )
  }  
};

class Screen extends React.Component{
  render() {
    const { value } = this.props;
    return(
      <form>
        <input 
          type="text" 
          className="textbox" 
          value={ value } 
          readOnly
          />
      </form>  
    );
  }
}



class Button extends React.Component{
  render() {
    const { klass, value, text, onClick } = this.props;
    return(
      <button 
        className = { klass } 
        onClick={ onClick } 
        value = { value } 
        // onMouseDown="console.log('dookie');"
      >
        { text }
      </button>
    )
  }
}
        
ReactDOM.render(
  <App />,
  document.getElementById('main-container')
);


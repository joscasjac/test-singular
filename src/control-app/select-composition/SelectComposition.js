import React, { Component } from 'react'
import CompositionModal from './CompositionModal'
import './SelectComposition.css'

export class SelectComposition extends Component {
    state = { show: this.props.show };

    showModal = () => {
        this.setState({ show: 'fadeIn' });
        
    };

    hideModal = () => {
        this.setState({ show: 'fadeOut' });
    };
	
    
    render() {
        return (
            <div className="flex_start" style={{float:'left', width:'unset'}}>
                   
            <button style={{marginLeft:'0.3vh',marginRight:'0.4vh'}} className='btn_icon' type='button' onClick={this.showModal}>
             <span className='tooltip cornerRB'>
                <span className="tooltiptext">Select Composition</span>
                
                
                </span>
            </button>
            
       
            <CompositionModal     
                show={this.state.show} 
                hide={this.hideModal} 
                source={this.props.SourceComp}
            />

        </div>
        )
    }
}

export default SelectComposition

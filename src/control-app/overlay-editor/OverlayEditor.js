import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

export class OverlayEditor extends Component {
    componentDidMount(props){
        this.createSingularDefault(this.props)  
    }
    componentWillReceiveProps(props){
        this.createSingularDefault(props)  
    }
    createSingularDefault=(props)=>{
        if(props.subComp!=undefined){
           
            var ctrlNode = props.subComp.getControlNode();
            console.log('payload ctrlnode')
            console.log(props.payload)
            console.log(ctrlNode)
           /// ctrlNode.payload= props.payload
            let dom = findDOMNode(this.refs.overlayEditor)
            let currentImagePayloadKey
            let singularForm = props.app.createSingularForm(window, dom, ctrlNode,
            (msg)=> {
                if (msg.event == 'load') {}
                else if (msg.event == 'change') {
                    props.setPayload(msg.payload)
                }
                else if (msg.event == 'button_clicked') {}
            })
        }
       
    }
    render() {
        return (
            <div ref='overlayEditor'>



            </div> 
                
           
        )
    }
}

export default OverlayEditor

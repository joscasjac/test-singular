import React, { Component } from 'react'
import loading from './loading-bubbles.svg'
import SelectComposition from './select-composition/SelectComposition'
import OverlayEditor from './overlay-editor/OverlayEditor'
import './controlapp.css'
export class ControlApp extends Component {
    state = { Fade: 'FadeIn' };
    initSingular = async()=>{
        this.refs.selectComp.hideModal()
        this.setState({Fade: 'fadeIn'})
        this.setState({SingularApp: window.singularApp})
        this.setState({SingularPlayer: window.SingularPlayer})
        let SingularPlayer = window.SingularPlayer
        let output
        let currentComposition
        let compositionBrowserSrc
        let compositionName
        let payloadDataKey = 'PayloadData';
        if(this.state.SingularApp===undefined) setTimeout(this.initSingular, 3000);
        else{  
            //setting output
            // this.state.SingularApp.storage.get('payload',(payload)=>{
            //     if(payload!=null)this.setState({payload:payload.payload})
            // })
            let outputs = this.state.SingularApp.listOutputs()
            output = this.state.SingularApp.getOutput(outputs[0].id)
            currentComposition = output.getComposition();
            compositionBrowserSrc = this.state.SingularApp.getCompositionBrowserUrl()
            
            this.setState({Output: output})
            this.setState({SourceComp: compositionBrowserSrc})
            this.setState({Fade: 'fadeOut'})

            

           this.state.SingularApp.compositionBrowserEventCallback(window, (msg) =>{
                if (msg.event == 'composition_selected') {
                    this.setState({Fade: 'fadeIn'})
                    let name = 'composition ' + Date.now();
                    {
                        let compToImport = [{ name: name, composition: msg.composition }];
                        this.state.SingularApp.importComposition(compToImport,  (result) =>{
                            if (result.success) 
                            {
                            
                                currentComposition = this.state.SingularApp.getCompositionByName(name);
                                let subComps = currentComposition.listSubcompositions()
                                let subComp = currentComposition.getSubcompositionById(subComps[0].id)
                                let payload = subComp.getPayload()
                                setCompositionToOutput(currentComposition, output);
                                this.setState({compName: msg.composition.name});
                                this.setState({currentComp: currentComposition})
                                this.setState({subComp:subComp})
                                this.setState({payload:payload})
                                

                            }
                            this.refs.selectComp.hideModal()
                            function setCompositionToOutput(currentComposition, output) {
                                if (currentComposition)
                                    output.setComposition(currentComposition);
                            }
                            
                        })
                        this.setState({Fade: 'fadeOut'})
                    }
                }
                
            })
        }
    }
    componentDidMount() {
        
        setTimeout(this.initSingular, 3000); 

    }
    setPayload=(payload)=>{
        this.state.SingularApp.storage.set('payload', {payload})
        this.setState({payload:payload})
    }
    render() {
        return (
            <div>
                <div id='loader' className={this.state.Fade}>
                    <img alt='loading' id='bubbles' src={loading} />
                </div>
                <SelectComposition
                    ref="selectComp" 
                    SourceComp={this.state.SourceComp} 
                    app={this.state.SingularApp} 
                />
                <OverlayEditor
                    subComp={this.state.subComp}
                    app={this.state.SingularApp}
                    setPayload={this.setPayload} 
                    payload={this.state.payload}
                />
            </div>
        )
    }
}

export default ControlApp

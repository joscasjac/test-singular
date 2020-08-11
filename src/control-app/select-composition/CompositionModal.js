import React, { Component } from 'react'

export class CompositionModal extends Component {
    render() {
        return (
            <div 
                className={"modalComp modal fade "+this.props.show} tabIndex="-1" role="dialog" id='compositionBrowserModal'>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{height:'95%'}}>
                            <div className="modal-header title_bar title_bar_padding flex">
                                <span className="modal-title">Import composition</span>
                                <div className='tooltip cornerL'>
                                    <button className='btn_icon float_right' style={{marginRight:'1vh'}}onClick={this.props.hide} type="button" data-dismiss="modal" aria-label="Close">
                                        <span className="tooltiptext">Close</span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body" style={{height:'100%'}}>
                                <iframe src={this.props.source} title='hello' id='compositionBrowser'></iframe>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default CompositionModal

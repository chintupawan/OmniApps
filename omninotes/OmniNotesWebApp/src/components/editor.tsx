import * as React from 'react';
import { EditorProps } from '../types/types';

export default class Editor extends React.Component<EditorProps, any> {
    constructor(props: EditorProps) {
        super(props);
        this.state = {
            title: ""
        }

        this.onchangeState = this.onchangeState.bind(this);
    }

    private onchangeState(e:any){
        this.setState({title: e.target.value});
        this.props.onpageTitleChange(this.state.title);
    }
    public render() {
        const {page} = this.props;
        return (
            <div className="omni-page">
            <div className="clearfix">
                <div className="float-left"><input type="text" value={page.title} onChange={this.onchangeState} /></div>
                <div className="float-right">22/02/2018</div>
            </div>
            <hr />
            <textarea value= {page.body}></textarea>
        </div>
        );
    }
}
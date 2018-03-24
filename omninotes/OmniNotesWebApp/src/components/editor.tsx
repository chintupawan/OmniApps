import * as React from 'react';

export default class Editor extends React.Component {
    constructor(props: any) {
        super(props);

    }
    public render() {
        return (
            <div className="omni-page">
            <div className="clearfix">
                <div className="float-left"><input type="text" value="Page Title" /></div>
                <div className="float-right">22/02/2018</div>
            </div>
            <hr />
            <textarea></textarea>
        </div>
        );
    }
}
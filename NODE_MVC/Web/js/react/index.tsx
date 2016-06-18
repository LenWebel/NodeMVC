
import * as React from "react";
import {Component} from "react";


interface Props {
    prop1:string;
}    

export class IndexComponent extends React.Component<Props,{}> {
    
    render() {
            return <span>{this.props.prop1}</span>
    }
}
import { Component } from "react";

export class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
    }
    
    render() {
        
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Ha ocurrido un error</h2>  
                </div>
            );
        }

        return this.props.children;
    }


}
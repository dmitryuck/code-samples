import React from 'react';
import {
    Container,
} from 'semantic-ui-react';
import { AppRoutes } from '../../../AppRoutes';

export interface State {
}

export interface Props {
    url?: string;
    target: string;
    history?: any;
}

const styles = {

};

export class Body extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { url, target, history } = this.props;

        return (
            <AppRoutes target={target} url={url} history={history} />
        );
    }
}

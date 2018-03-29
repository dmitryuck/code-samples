import './Body.css';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, ActionCreator } from 'react-redux';
// import Grid from 'material-ui/Grid';
// import Paper from 'material-ui/Paper';
// import { Button } from 'material-ui';
import { FileUploader } from '../FileUploader/FileUploader';
import { FileList } from '../FileList/FileList';
import { AppRootState, AppState, ServerResponse } from '../../common';
import { AppActions } from '../../actions';
import { AppThunks } from '../../thunks';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

interface State {

}

interface Props {
    app?: AppState;
    dispatch?: ActionCreator<any>;
    getFiles?: Function;
}

@connect((state: AppRootState) => ({
    app: state.appState
}), (dispatch: ActionCreator<any>) => bindActionCreators({
    dispatch: dispatch,
    getFiles: AppThunks.getFiles
}, dispatch))
export class Body extends React.Component<Props, State> {
    /*handleChange = key => (event, value) => {
        this.setState({
          [key]: value,
        });
    };*/
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.props.getFiles().then((res: ServerResponse) => {
            if (res.success) {
                console.log(res.data);
            }
        });
    }

    render() {
        return (
            <Grid className="Body_root">
                <Row>
                    <Col xs={12}>
                        <FileUploader />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FileList files={this.props.app.files}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

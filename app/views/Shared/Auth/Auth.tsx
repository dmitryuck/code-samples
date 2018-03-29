import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppActions, AuthActions } from '../../../actions';
import { AuthThunks } from '../../../thunks';
import { AppState, AuthState } from '../../../common';
import { Button, Modal, Tab, Form, Header, Message } from 'semantic-ui-react'

interface State {
    errorMessage: string;
    isLoading: boolean;
}

interface Props {
    app?: AppState;
    auth?: AuthState;
    localLogin?: Function;
    localSignup?: Function;
    showAuth?: Function;
    setUser?: Function;
}

@connect(state => ({
    app: state.appState,
    auth: state.authState
}), dispatch => bindActionCreators({
    showAuth: AuthActions.showAuth,
    localLogin: AuthThunks.localLogin,
    localSignup: AuthThunks.localSignup,
    setUser: AuthActions.setUser
}, dispatch))
export class Auth extends React.Component<Props, State> {
    activeTabIndex = 0;

    loginParams: any = {};
    signupParams: any = {};

    panes = [
        { menuItem: 'Log In', render: () => <Tab.Pane attached='top'><this.logIn /></Tab.Pane> },
        { menuItem: 'Sign Up', render: () => <Tab.Pane attached='top'><this.signUp /></Tab.Pane> },
        { menuItem: 'Restore password', render: () => <Tab.Pane attached='top'><this.restorePass /></Tab.Pane> },
    ];

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null,
            isLoading: false
        };

        this.onTabChange = this.onTabChange.bind(this);
        this.onNoClick = this.onNoClick.bind(this);
        this.onYesClick = this.onYesClick.bind(this);
    }

    // handleOpen = () => this.setState({ modalOpen: true });
    // handleClose = () => this.setState({ modalOpen: false });
    // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    componentDidMount() {
    }

    // handleChange = (e, { value }) => this.setState({ value });

    logIn = () => (
        <Form error={true}
              loading={this.state.isLoading}>
            <Form.Input onChange={e => {this.loginParams.email = (e.target as any).value}} label='Email' placeholder='Email' />
            <Form.Input onChange={e => {this.loginParams.password = (e.target as any).value}} label='Password' placeholder='Password' />
            <Form.Checkbox label='Remember me' />
            {this.state.errorMessage &&
            <Message
              error
              header='Auth error'
              content={this.state.errorMessage} />}
        </Form>
    );

    signUp = () => (
        <Form error={true}>
            <Form.Input onChange={e => {this.signupParams.name = (e.target as any).value}} label='Name' placeholder='Name' />
            <Form.Select onChange={e => {this.signupParams.countryId = (e.target as any).value._id}} label='Country' options={this.props.app.countries} placeholder='Country' />
            <Form.Input onChange={e => {this.signupParams.email = (e.target as any).value}} label='Email' placeholder='Email' />
            <Form.Input onChange={e => {this.signupParams.password = (e.target as any).value}} label='Enter password' placeholder='Enter password' />
            <Form.Input onChange={e => {this.signupParams.repeat = (e.target as any).value}} label='Repeat password' placeholder='Repeat password' />
            <Form.Checkbox label='I agree with service terms' />
            {this.state.errorMessage &&
            <Message
              error
              header='Auth error'
              content={this.state.errorMessage} />}
        </Form>
    );

    restorePass = () => (
        <Form>
            <Form.Input label='Email' placeholder='Email' />
        </Form>
    );

    onTabChange = (event: any, data: any) => {
        this.activeTabIndex = data.activeIndex;
        // this.setState({ errorMessage: null });
    };

    onYesClick = (event: any, data: any) => {
        switch (this.activeTabIndex) {
            // Login
            case 0: {
                this.doLoginActions();
                break;
            }
            // Signup
            case 1: {
                this.doSignupActions();
                break;
            }
        }
    };

    onNoClick = (event: any, data: any) => {
        this.props.showAuth(false);
    };

    doLoginActions() {
        this.setState({ isLoading: true });
        this.setState({ errorMessage: null });

        this.props.localLogin(this.loginParams.email, this.loginParams.password).then((res) => {
            this.setState({ isLoading: false });
            if (res.success) {
                this.props.showAuth(false);
                this.props.setUser(res.data);
            } else {
                this.setState({ errorMessage: res.error });
            }
        });
    }

    doSignupActions() {
        this.setState({ isLoading: true });
        this.setState({ errorMessage: null });

        if (!this.signupParams.name ||
            this.signupParams.countryId ||
            !this.signupParams.password ||
            !this.signupParams.repeat) {
            this.setState({ errorMessage: 'Fill all required fields' });

            return;
        }

        if (this.signupParams.password !== this.signupParams.repeat) {
            this.setState({ errorMessage: 'Entered incorrect password' });

            return;
        }

        this.props.localSignup(this.signupParams).then((res) => {
            this.setState({ isLoading: false });
            if (res.success) {
                this.props.showAuth(false);
                this.props.setUser(res.data);
            } else {
                this.setState({ errorMessage: res.error });
            }
        });
    }

    close = () => {
        this.props.showAuth(false);
    };

    render() {
        return (
            <Modal size='mini'
                   open={this.props.auth.showAuth}
                   closeOnEscape={true}
                   closeOnRootNodeClick={true}
                   onClose={this.close}
                   closeIcon>
                <Header icon='privacy' content='Authorization' />
                <Modal.Content>
                    <Tab onTabChange={this.onTabChange} menu={{ attached: 'bottom' }} panes={this.panes} />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onNoClick} negative>No</Button>
                    <Button onClick={this.onYesClick} positive>Yes</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

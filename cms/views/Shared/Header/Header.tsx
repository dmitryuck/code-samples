import React from 'react';
import {
    Segment,
    Container,
    Grid
} from 'semantic-ui-react';

interface State {
    loaded: boolean;
}

interface Props {
}

const styles = {

};

export class Header extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }

    componentDidMount() {
        this.setState({ loaded: true });
    }

    render() {
        const loading = this.state.loaded ? '' : ' (loading...)';

        return (
            <Segment>
                <Container fluid>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle'>
                                <h1>Cms</h1>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment floated='right'>

                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

import React from 'react';
import {
    Segment,
    Container,
    Grid
} from 'semantic-ui-react';

interface State {
}

interface Props {
}

export class Footer extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Segment>
                <Container>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column verticalAlign='middle'>
                                <h1>Footer</h1>
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

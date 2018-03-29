import React from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

interface State {
}

interface Props {
    name: string;
    css: any;
}

const styles = {
    elementContainer: {
        border: '1px solid #ccc',
        cursor: 'move',
        padding: 10,
        marginBottom: 4,
    }
};

export class SortableElement extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {name, css} = this.props;
        const style =  {
            ...css,
            ...styles.elementContainer
        };

        return (
            <div style={style}>{name}</div>
        );
    }
}

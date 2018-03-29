import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { treeData } from './treeData';
import { SortableElement } from './SortableElement';
import { SortableHeader } from './SortableHeader';
import { isBrowser, Category, ServerResponse } from '../../../../glob';
import { CategoryState, transformCatsToSave, transformCatsToShow } from '../../../common';
import { CategoryActions } from '../../../actions';
import { CategoryThunks } from '../../../thunks';

import {
    Button,
    Modal,
    Form,
    Header,
    Input
} from 'semantic-ui-react'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Sortly from 'react-sortly';

interface State {
    editItem: {
        id: string;
        name: string;
    };
}

interface Props {
    categoryState?: CategoryState;
    dispatch?: Function;
    saveCategories?: Function;
    deleteCategory?: Function;
    updateCategory?: Function;
}

const styles = {
    itemStyle: {
        border: '1px solid #ccc',
        cursor: 'move',
        padding: 10,
        marginBottom: 4,
    },
    muteStyle: {
        opacity: 0.3
    }
};

@connect(state => ({
    categoryState: state.categoryState
}), dispatch => bindActionCreators({
    dispatch: dispatch,
    saveCategories: CategoryThunks.saveCategories,
    deleteCategory: CategoryThunks.deleteCategory,
    updateCategory: CategoryThunks.updateCategory
}, dispatch))
@DragDropContext(HTML5Backend)
export class SortableTree extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            editItem: null
        }

        // this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        if (isBrowser) {
        }
    }

    sortableOrderChange = (items) => {
        const categories = transformCatsToSave(items);

        this.props.saveCategories(categories).then((res: ServerResponse) => {
            if (res.success) {
                this.props.dispatch(CategoryActions.setCategories(transformCatsToShow(res.data)));
            }
        });
    };

    sortableElementRenderer = (props) => {
        const {
            _id,
            name,
            path,
            edit,
            connectDragSource,
            connectDropTarget,
            isDragging,
            isClosestDragging
        } = props;

        const style = {
            ...styles.itemStyle,
            ...(isDragging || isClosestDragging ? styles.muteStyle : null),
            marginLeft: path.length * 30
        };

        const sortableElement = (
            <div style={style} className='sortable-element'>
                <span>{name}</span>
                <div className='item-controls'>
                    <button id={_id} onClick={this.editItem.bind(this, {id: _id, name: name})}>Edit</button>
                    <button id={_id} onClick={this.deleteItem.bind(this, _id)}>Delete</button>
                </div>
            </div>
        );

        return connectDragSource(connectDropTarget(sortableElement));
    };

    editItem(item) {
        this.setState({editItem: item});
    }

    deleteItem(id) {
        this.props.deleteCategory(id).then((res) => {
            if (res.success) {
                const categories = transformCatsToShow(res.data);
                this.props.dispatch(CategoryActions.setCategories(categories));
            }
        });
    }

    itemNameChange = (event: any, data: any) => {
        this.setState({
            editItem: {
                id: this.state.editItem.id,
                name: data.value
            }
        });
    };

    onYesClick = (event: any, data: any) => {
        const {editItem} = this.state;

        const catBody = {
            name: editItem.name
        };

        this.props.updateCategory(editItem.id, catBody).then((res: ServerResponse) => {
            this.setState({editItem: null});

            if (res.success) {
                const categories = transformCatsToShow(res.data);
                this.props.dispatch(CategoryActions.setCategories(categories));
            }
        });
    };

    onNoClick = (event: any, data: any) => {
        this.setState({editItem: null});
    };

    close = () => {
        this.setState({editItem: null});
    };

    render() {
        const cats = this.props.categoryState.categories;
        const {editItem} = this.state;
        const categoryName = editItem ? editItem.name : '';

        return (
            <>
                <div>
                    <SortableHeader/>
                </div>
                <div className='sortable-tree-container'>
                    <Sortly items={cats}
                            itemRenderer={this.sortableElementRenderer}
                            onChange={this.sortableOrderChange} />
                </div>
                <Modal  size='mini'
                        open={editItem !== null}
                        closeOnEscape={true}
                        closeOnRootNodeClick={true}
                        onClose={this.close}
                        closeIcon>
                    <Header icon='write' content='Edit' />
                    <Modal.Content>
                        <Input fluid
                               defaultValue={categoryName}
                               onChange={this.itemNameChange}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.onNoClick} negative>No</Button>
                        <Button onClick={this.onYesClick} positive>Yes</Button>
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

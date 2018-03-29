import './FileList.css';
import React from 'react';
import List, { ListItem /*, ListItemIcon*/, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { File } from '../../common';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

interface Props {
    files: File[];
}

interface State {
    expandFile: number;
    selectedFile: any;
    showDeleteDialog: boolean;
}

export class FileList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            expandFile: -1,
            selectedFile: null,
            showDeleteDialog: false
        };
    }

    toggleExpand = (itemIndex: number) => {
        this.setState((state) => ({ expandFile: state.expandFile !== itemIndex ? itemIndex : -1 }));
    }

    deleteFile = (e: MouseEvent, file: File) => {
        e.stopPropagation();
        this.setState({showDeleteDialog: true});
        console.log(file);
    }

    confirmClose = () => {
        this.setState({showDeleteDialog: false});
    }

    drawFileList = (files: File[]) => (
        files.map((file: File, index: number) => (
            <div key={index}>
                <ListItem button={true} onClick={() => this.toggleExpand(index)}>
                    <Icon>insert_drive_file</Icon>
                    <ListItemText inset={true} primary="Inbox" />
                    {this.state.expandFile === index ? <ExpandLess /> : <ExpandMore />}
                    <Button
                            variant="fab"
                            color="primary"
                            aria-label="add"
                            onClick={(e: any) => this.deleteFile(e, file)}
                    >
                        <Icon>delete</Icon>
                    </Button>
                </ListItem>
                {this.state.expandFile === index && <Collapse in={true} timeout="auto" unmountOnExit={true}>
                    <List component="div" disablePadding={true}>
                        <ListItem button={false}>
                            <ListItemText inset={true} primary="Size" />
                        </ListItem>
                        <ListItem button={false}>
                            <ListItemText inset={true} primary="Expired" />
                        </ListItem>
                    </List>
                </Collapse>}
            </div>
        ))
    )

    render() {
        return (
            <>
            <List component="nav">
                {this.drawFileList(this.props.files)}
            </List>
            <Dialog
                open={this.state.showDeleteDialog}
                onClose={this.confirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.confirmClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={this.confirmClose} color="primary" autoFocus={true}>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            </>
        );
    }
}
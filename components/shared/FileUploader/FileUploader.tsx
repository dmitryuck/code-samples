import './FileUploader.css';
import React from 'react';
import { Button } from 'material-ui';
import Input /*, { InputLabel }*/ from 'material-ui/Input';
import { FormControl /*, FormHelperText*/ } from 'material-ui/Form';
import { uploadRequest, ServerResponse, ServerApi } from '../../common';
import MaterialDateTimePicker from 'material-datetime-picker';

interface Props {

}

interface State {
    fileForUpload: any;
}

export class FileUploader extends React.Component<Props, State> {
    picker;

    constructor(props: Props) {
        super(props);

        this.state = {
            fileForUpload: null
        };

        this.picker = MaterialDateTimePicker;
    }

    uploadingFileChanged = (event: any) => {
        this.setState({
            fileForUpload: event.target.files[0]
        });
    }

    uploadFile = (event: any) => {
        const body = {
            fileName: this.state.fileForUpload
        };

        uploadRequest(ServerApi.FILES, body).then((res: ServerResponse) => {
            console.log(res);
        });
    }

/*const picker = new MaterialDateTimePicker()
.on('submit', (val) => console.log(`data: ${val}`))
.on('open', () => console.log('opened'))
.on('close', () => console.log('closed'));

document.querySelector('.c-datepicker-btn')
.on('click', () => picker.open());*/

    render() {
        return (
            <>
                <FormControl className="" disabled={true}>
                {/* <InputLabel htmlFor="name-disabled">Upload file</InputLabel> */}
                <div className="FileUploader-file-name-container">
                    <Input
                        id="name-disabled"
                        className="FileUploader_file-name"
                        value={this.state.fileForUpload ? this.state.fileForUpload.name : 'No file selected'}
                    />
                </div>
                {/* <FormHelperText>Disabled</FormHelperText> */}
                </FormControl>
                <input
                    className="FileUploader_upload-input"
                    id="raised-button-file"
                    multiple={false}
                    type="file"
                    onChange={this.uploadingFileChanged}
                />
                <label htmlFor="raised-button-file">
                    <Button className="" variant="raised" component="span">
                        Select
                    </Button>
                </label>
                <div className="FileUploader_upload-button">
                    <Button onClick={this.uploadFile} variant="raised" color="primary" component="span">
                        Upload
                    </Button>
                </div>
                <div className="FileUploader_upload-button">
                    <Button onClick={() => this.picker.open()} variant="raised" color="primary" component="span">
                        Timeout
                    </Button>
                </div>
            </>
        );
    }
}

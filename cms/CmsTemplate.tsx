import React from 'react';
// import { Helmet } from 'react-helmet';
import nconf = require('nconf');

interface State {

}

interface Props {
    state: any;
    content: string;
    // min: boolean;
}

export class CmsTemplate extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ loaded: true });
    }

    render() {
        // Add helmet to control title at the view level
        // const helmet = Helmet.rewind();
        // const suffix = this.props.min ? '.min' : '';

        return (
            <html lang="en-us">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <base href="/" />

                    {/*
                    {helmet.meta.toComponent()}
                    {helmet.title.toComponent()}
                    {helmet.link.toComponent()}
                    */}

                    <title>Starter</title>

                    <link href="assets/favicon.ico" rel="shortcut icon" />
                    <link href="assets/lib/semantic/semantic.min.css" rel="stylesheet" media="screen" />
                    <link href="assets/css/styles.cms.css" rel="stylesheet" media="screen" />

                    <script dangerouslySetInnerHTML={{__html: `
                        window.onload = function() {
                            window['__PRELOADED_STATE__'] = ${JSON.stringify(this.props.state).replace(/</g, '\\u003c')}
                        }`}}>
                    </script>
                </head>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{__html: this.props.content}}/>

                    {!nconf.get('IS_PROD') && <script src="reload/reload.js"></script>}

                    <script src="assets/lib/react/react.production.min.js"></script>
                    <script src="assets/lib/react/react-dom.production.min.js"></script>
                    <script src="assets/js/cms.dev.js"></script>
                </body>
            </html>
        );
    }
}

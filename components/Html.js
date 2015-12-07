import React from 'react';
import PageStore from '../stores/PageStore';

class Html extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(PageStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="/assets/todomvc-common/base.css" />
                <link rel="stylesheet" href="/assets/styles.css" />
            </head>
            <body>
                <section id="todoapp" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
                <footer id="info">
                    <p>Double-click to edit a todo</p>
                    <p>Some assets from <a href="http://todomvc.com">TodoMVC</a></p>
                    <p>Some code inspried by <a href="http://todomvc.com/examples/react/">TodoMVC React (Pete Hunt)</a></p>
                    <p>Showing off <a href="http://fluxible.io">Fluxible</a></p>
                </footer>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src={'/public/js/' + this.props.clientFile}></script>
            </body>
            </html>
        );
    }
}

export default Html;

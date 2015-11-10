import React from 'react';

class Footer extends React.Component {
    render() {
        var nowShowing = this.props.nowShowing;
        var onFilterChange = this.props.onFilterChange;
        var activeTodoLabel = 'item' + (this.props.count > 1 ? 's' : '');
        var clearButton;

        if (props.completedCount > 0) {
            clearButton = (
                <button
                    id="clear-completed"
                    onClick={this.props.onClearCompleted}>

                    Clear completed ({this.props.completedCount})
                </button>
            );
        }
        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoLabel} left
                </span>
                <ul id="filters">
                    <li>
                        <a
                            href="#"
                            onClick={onFilterChange.bind(null, 'ALL_TODOS')}
                            className={nowShowing === 'ALL_TODOS' ? 'selected' : ''}>

                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#"
                            onClick={onFilterChange.bind(null, 'ACTIVE_TODOS')}
                            className={nowShowing === 'ACTIVE_TODOS' ? 'selected' : ''}>

                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#"
                            onClick={onFilterChange.bind(null, 'COMPLETED_TODOS')}
                            className={nowShowing === 'COMPLETED_TODOS' ? 'selected' : ''}>

                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}

export default Footer;

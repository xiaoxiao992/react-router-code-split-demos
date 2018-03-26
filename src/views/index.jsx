import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import AsyncLoader from '../routers/AsyncLoader';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
const AsyncUser = AsyncLoader({ loader: () => import('./user') });
const AsyncSortable = AsyncLoader({ loader: () => import('./Sortable') });
const AsyncDragSources = AsyncLoader({ loader: () => import('./Nesting/DragSources') });
const AsyncDropTargets = AsyncLoader({ loader: () => import('./Nesting/DropTargets') });
const AsyncCustomDragLayer = AsyncLoader({ loader: () => import('./CustomDragLayer') });

export default class Index extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>这是Indexd</div>
                <p> <Link to="/user" >User</Link></p>
                <p> <Link to="/dnd/nesting/drag">nesting/drag</Link></p>
                <p> <Link to="/dnd/nesting/drop">nesting/drop</Link></p>
                <p> <Link to="/dnd/sortable">sortable</Link></p>
                <p> <Link to="/dnd/CustomDragLayer">CustomDragLayer</Link></p>
                <DragDropContextProvider backend={HTML5Backend}>
                    <Switch>
                        <Route path="/dnd/CustomDragLayer" exact={true} component={AsyncCustomDragLayer} />
                        <Route path="/dnd/nesting/drag" exact={true} component={AsyncDragSources} />
                        <Route path="/dnd/nesting/drop" exact={true} component={AsyncDropTargets} />
                        <Route path="/dnd/sortable" exact={false} component={AsyncSortable} />
                        <Route path="/user" exact={false} component={AsyncUser} />
                    </Switch>
                </DragDropContextProvider>
            </div >
        )
    }
};
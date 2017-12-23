import React from 'react'

import classes from './BuildControl.css'

const buildControl = props => ( //JSX uses () instead of {}
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>Less</button>
        <button
            className={classes.More}
            onClick={props.added}>More</button>
    </div>
);

export default buildControl
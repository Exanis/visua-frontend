import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class VisuaSwitch extends React.Component {
    render () {
        return <FormControlLabel
          control={
            <Switch
              checked={this.props.checked}
              onChange={this.props.onChange}
            />
          }
          label={this.props.label}
        />
    }
}

VisuaSwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default VisuaSwitch;
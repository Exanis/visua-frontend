import React from 'react';
import configureStore from '../../store';
import {connect} from 'react-redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Layout from '../Layout';
import createHistory from 'history/createBrowserHistory';

import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Users from '../Pages/Users';
import Pipeline from '../Pages/Pipeline';

const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const history = createHistory();
const store = configureStore(history);

class PrivateRouteComponent extends React.Component {
    render () {
        const { component, ...others } = this.props;

        if (!this.props.user.anonymous) {
            return <Route {...this.props} />;
        }
        return <Route component={Login} {...others} />;
    }
}

class StaffRouteComponent extends React.Component {
    render () {
        const { component, ...others } = this.props;

        if (!this.props.user.anonymous && this.props.user.info.is_staff) {
            return <Route {...this.props} />;
        }
        return <Route component={Login} {...others} />;
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);
const StaffRoute = connect(mapStateToProps)(StaffRouteComponent);

class App extends React.Component {
    render () {
        return <Provider store={store}>
            <IntlProvider locale={languageWithoutRegionCode}>
                <ConnectedRouter history={history}>
                    <Layout>
                        <Switch>
                            <Route exact path={'/'} component={Login} />

                            <PrivateRoute exact path={'/home'} component={Pipeline} />
                            <PrivateRoute exact path={'/profile'} component={Profile} />

                            <StaffRoute exact path={'/users'} component={Users} />
                        </Switch>
                    </Layout>
                </ConnectedRouter>
            </IntlProvider>
        </Provider>;
    }
}

App.propTypes = {};

export default App;
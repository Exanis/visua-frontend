import { push } from 'connected-react-router';

export function redirect(location) {
    return push(location);
}
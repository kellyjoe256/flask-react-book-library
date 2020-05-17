import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Row, Col } from 'react-bootstrap';
import { getUsers, deleteUser } from '../../../store/modules/users';
import Limiter from '../../common/Limiter';
import Paginator from '../../common/Paginator';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
    }

    componentDidMount() {
        const { getUsers } = this.props;

        getUsers();
    }

    onLimitChange(limit) {
        const { getUsers } = this.props;

        this.setState({ limit });

        getUsers(`page=1&limit=${limit}`);
    }

    onPageChange(page) {
        const { getUsers } = this.props;
        const { limit } = this.state;

        getUsers(`page=${page}&limit=${limit}`);
    }

    delete(id) {
        // eslint-disable-next-line
        if (!confirm('Are you sure?')) {
            return;
        }

        const { getUsers, deleteUser } = this.props;

        deleteUser(id)
            .then(() => {
                toast.success('Author deleted successfully');
                getUsers();
            })
            .catch(console.log);
    }

    showUsers() {
        const { users } = this.props;

        return (
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Is admin?</th>
                        <th>Created</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.is_admin ? 'True' : 'False'}</td>
                            <td>
                                {moment(user.created_at).format(
                                    'MMMM Do, YYYY h:mm A'
                                )}
                            </td>
                            <td>
                                <Link
                                    to={`/admin/users/${user.id}/edit`}
                                    className="text-info"
                                >
                                    Edit
                                </Link>
                                <a
                                    href={`#${user.id}`}
                                    className="text-danger"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        this.delete(user.id);
                                    }}
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        const { users, pagination } = this.props;

        return (
            <>
                <Row className="justify-content-md-center">
                    <Col lg="11" md="auto">
                        <Row className="mb-3">
                            <Col>
                                <Limiter onLimitChange={this.onLimitChange} />
                            </Col>
                            <Col className="text-right">
                                <Link
                                    to="/admin/users/add"
                                    className="btn btn-outline-secondary"
                                >
                                    Add User
                                </Link>
                            </Col>
                        </Row>
                        {!users.length && <h1>No users found</h1>}
                        {users.length && this.showUsers()}
                        {pagination && (
                            <Paginator
                                current_page={pagination.meta.current_page}
                                pages={pagination.meta.last_page}
                                onPageChange={this.onPageChange}
                            />
                        )}
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users.items,
    pagination: state.users.pagination,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(Index);

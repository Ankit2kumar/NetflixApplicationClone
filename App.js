import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';
import NavbarNetflix from './components/NavbarNetflix';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import React from 'react';
import MoviePage from './components/MoviePage';
import NetflixFooter from './components/NetflixFooter';
import Details from './components/Details';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import NewRegistration from './components/NewRegistration';
import ErrorAlert from './components/ErrorAlert';
class App extends React.Component {
	state = {
		queryArr: ['Harry Potter', 'Lord of the Rings', 'Terminator'],
		history: [],
		data: [],
		searchText: '',
		error: {
			mes: '',
			isError: false,
		},
		showComments: false,
		selectedMovie: {},
	};

	handleShowCommentsClick = (showComments, selectedMovie) => {
		this.setState({ showComments: showComments, selectedMovie: selectedMovie });
	};
	// Search field
	handleSearchTextChange = (searchText) => {
		this.setState({
			searchText: searchText,
			queryArr:
				searchText.length >= 3
					? [searchText]
					: ['Harry Potter', 'Lord of the Rings', 'Terminator'],
		});
	};

	fetchData = async () => {
		this.setState({
			data: await Promise.all(
				this.state.queryArr.map(async (query) => {
					const res = await fetch(
						`http://www.omdbapi.com/?s=${query}&apikey=5660ed2b`,
						{
							method: 'GET',
							header: {
								ContentType: 'application/json',
							},
						}
					);
					return await res.json();
				})
			).catch((err) => {
				this.setState({
					error: {
						mes: err.message,
						isError: true,
					},
				});
			}),
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.searchText.length === 0 && prevState.searchText.length !== 0)
			this.fetchData();
		if (
			this.state.searchText.length > 0 &&
			prevState.searchText !== this.state.searchText
		) {
			this.fetchData();
		}
	}
	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<>
				<Router>
					<Switch>
						<NavbarNetflix
							onSearchTextChange={this.handleSearchTextChange}
							searchText={this.state.searchText}
						/>
						<Container fluid>
							{this.state.error.isError ? (
								<Row>
									<Col>
										<Alert variant="danger" className="mx-4">
											{this.state.error.mes}
										</Alert>
									</Col>
								</Row>
							) : (
								<Route
									render={(routerProps) => (
										<MoviePage
											data={this.state.data}
											searchText={this.state.searchText}
											movieRowTitles={this.state.queryArr}
											onShowCommentsClick={this.handleShowCommentsClick}
											{...routerProps}
										/>
									)}
									path="/Movies"
									exact
								/>
							)}
						</Container>
						<Route
							render={(routerProps) => (
								<Details
									selectedMovie={this.state.selectedMovie}
									onShowCommentsClick={this.handleShowCommentsClick}
									{...routerProps}
								/>
							)}
							path="/Details/:id"
							exact
						/>
						<Container>
							<Route component={NewRegistration} path="/register" exact />
						</Container>
						<NetflixFooter />
						<Route path="*">
							<ErrorAlert />
						</Route>
					</Switch>
				</Router>
			</>
		);
	}
}

export default App;

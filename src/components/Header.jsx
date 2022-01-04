import React, { Component } from 'react';
import { getUser } from '../services/user-service';
import Logo from './../assets/logo.png';
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: true,
			typeofUser: '',
			delay: false,
		};
		this.user = getUser();
	}

	signOut = (e) => {
		e.preventDefault();
		let id = localStorage.getItem('accessToken');
		if (id !== '') {
			localStorage.setItem('accessToken', '');
			localStorage.setItem('type', '');
			this.setState({ loggedIn: false });
			window.location = '/signup';
		}
	};

	render() {
		let id = localStorage.getItem('accessToken');
		let a = id === '' ? false : true;
		return (
			<div className='d-false'>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
					<div className='container-fluid justify-content-between'>
						{this.StaticHeader()}
						{a ? this.NAVifT() : this.NAVifNT()}
						<form className='form-inline'>{a ? this.ifLogged() : ''}</form>
					</div>
				</nav>
			</div>
		);
	}

	StaticHeader() {
		return (
			<div className='d-flex flex-row'>
				<a className='navbar-brand d-flex flex-row align-items-center' href='/'>
					<img src={Logo} alt='logo' width='50' height='40' className='d-inline-block align-text-top'></img>
					BrainStormy
				</a>
				<button
					className='navbar-toggler p-1'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
			</div>
		);
	}

	NAVifT() {
		let type = localStorage.getItem('type');
		return (
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<a className='nav-link active' href='/'>
							Home
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/courses'>
							Courses
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link ' href='/profile'>
							profile
						</a>
					</li>
					{type === '2' || type === '1' ? (
						<li className='nav-item'>
							<a className='nav-link ' href='/createCourse'>
								Create Courses
							</a>
						</li>
					) : (
						''
					)}
					{type === '1' ? (
						<li className='nav-item'>
							<a className='nav-link ' href='/admin'>
								Panel
							</a>
						</li>
					) : (
						''
					)}
				</ul>
			</div>
		);
	}
	NAVifNT() {
		return (
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<a className='nav-link active' href='/'>
							Home
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/signup'>
							Sign up
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link ' href='/login'>
							Login
						</a>
					</li>
				</ul>
			</div>
		);
	}

	ifLogged() {
		return (
			<button className='btn btn-warning my-2 my-sm-0' onClick={this.signOut}>
				SignOut
			</button>
		);
	}
}

export default Header;

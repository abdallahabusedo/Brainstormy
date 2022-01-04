import React, { Component } from "react";
import Header from "../components/Header";
import swal from "@sweetalert/with-react";
import axiosClient from "../common/client";
import { getToken } from "../services/token-service";
import { LEARNER, INSTRUCTOR } from "../models/models"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: "", dirty: false },
      lastName: { value: "", dirty: false },
      username: { value: "", dirty: false },
      email: { value: "", dirty: false },
      birthdate: { value: "", dirty: false },
      type: null,
      readOnly: true,
    };
  }
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: { value, dirty: true },
    });
  };

	componentDidMount = () => {
		let id = getToken();
		let a = id === '' ? false : true;
		// let config = {
		//   method: "get",
		//   url: "http://localhost:3000/my/profile",
		//   headers: {
		//     Authorization: `Bearer ${id}`,
		//   },
		// };

		if (a) {
			axiosClient
				.get('/my/profile')
				.then((response) => {
					console.log(JSON.stringify(response.data));
					this.setState(
						{
							firstName: response.data.first_name,
							lastName: response.data.last_name,
							username: response.data.username,
							email: response.data.email,
							birthdate: response.data.birthdate.slice(0, 10),
							type:
								response.data.type === 3
									? 'Student'
									: response.data.type === 2
									? 'Instructor'
									: 'Admin',
						},
						() => {}
					);
					localStorage.setItem('type', response.data.type);
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			window.location = '/signup';
		}
	};
	EditForm = () => {
		this.setState({ readOnly: false });
	};
	SubmitEdit = (e) => {
		e.preventDefault();
		let userId = localStorage.getItem('accessToken');
		const data = JSON.stringify({
			firstName: this.state.first_name,
			lastName: this.state.last_name,
			username: this.state.username,
			email: this.state.email,
		});
		axiosClient
			.patch('/my/profile', data)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				this.setState({ readOnly: true });
			})
			.catch(function (error) {
				console.log(error);
				swal({
					title: 'Email or Username are taken',
					icon: 'error',
				});
			});
	};
	render() {
		return (
			<div>
				<Header />
				<section className='vh-100'>
					<div className='container py-5 h-100'>
						<div className='row d-flex justify-content-center align-items-center h-100'>
							<div className='col-md-0 col-xl-8'>
								<div className='card'>
									<div className='card-body text-center'>
										<div className='mt-0 mb-0'>
											<img
												alt='img'
												src={`https://ui-avatars.com/api/?name=${this.state.username}`}
												className='rounded-circle img-fluid w-50 h-50'
											/>
										</div>
										<h1 className='mb-2 mt-4'> {this.state.username} </h1>
										<h4 className='mb-2'> {this.state.type} </h4>
										{this.firstName()}
										{this.lastName()}
										{this.userName()}
										{this.email()}
										{this.birthdate()}
										{this.Submit()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}

	Submit() {
		return (
			<div className='pt-1 mb-4'>
				<button
					className={`${this.state.readOnly ? '' : 'd-none'} btn btn-warning btn-lg btn-block`}
					type='button'
					onClick={this.EditForm}>
					Edit
				</button>
				<button
					className={`${this.state.readOnly ? 'd-none' : ''} btn btn-warning btn-lg btn-block`}
					type='button'
					onClick={this.SubmitEdit}>
					Save
				</button>
			</div>
		);
	}

	birthdate() {
		return (
			<div className='form-outline mb-4'>
				<input
					type='date'
					id='form2Example27'
					name='birthdate'
					className='form-control form-control-lg'
					readOnly='true'
					defaultValue={this.state.birthdate}
					onChange={this.handleChange}
				/>
			</div>
		);
	}

	email() {
		return (
			<div className='form-outline mb-4'>
				<input
					type='email'
					id='form2Example17'
					name='email'
					className='form-control form-control-lg'
					readOnly={this.state.readOnly}
					placeholder='Email address'
					defaultValue={this.state.email}
					onChange={this.handleChange}
				/>
			</div>
		);
	}

	userName() {
		return (
			<div className='form-outline mb-4'>
				<input
					type='text'
					id='form2Example37'
					name='username'
					className='form-control form-control-lg'
					readOnly={this.state.readOnly}
					placeholder='User Name'
					defaultValue={this.state.username}
					onChange={this.handleChange}
				/>
			</div>
		);
	}

	lastName() {
		return (
			<div className='form-outline mb-4'>
				<input
					type='text'
					id='form2Example37'
					name='last_name'
					className='form-control form-control-lg'
					readOnly={this.state.readOnly}
					placeholder='Last Name'
					defaultValue={this.state.lastName}
					onChange={this.handleChange}
				/>
			</div>
		);
	}

	firstName() {
		return (
			<div className='form-outline mb-4'>
				<input
					type='text'
					name='first_name'
					id='form2Example37'
					className='form-control form-control-lg'
					placeholder='First Name'
					readOnly={this.state.readOnly}
					defaultValue={this.state.firstName}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default Profile;

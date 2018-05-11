import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './header';

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            applepay: null,
            googlepay: null,
            zelle: null,
            venmo: null,
            userProfile: [],
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            airport: ''
        }

        this.handleChangeapple = this.handleChangeapple.bind(this)
        this.handleChangegoogle = this.handleChangegoogle.bind(this)
        this.handleChangevenmo = this.handleChangevenmo.bind(this)
        this.handleChangezelle = this.handleChangezelle.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeLast = this.handleChangeLast.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.handleChangeAirport = this.handleChangeAirport.bind(this)
    }
    handleChangeAirport(event){
        this.setState({
            airport: event.target.value
        })
    }
    handleChangePhone(event){
        this.setState({
            phone: event.target.value
        })
    }
    handleChangeEmail(event){
        this.setState({
            email: event.target.value
        })
    }
    handleChangeName(event){
        this.setState({
            firstName: event.target.value
        })
    }

    handleChangeLast(event){
        this.setState({
            lastName: event.target.value
        })
    }

    handleChangeapple(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked :
       target.value;
       const name = target.name;

       this.setState({
            applepay : value
       })
    }
    handleChangevenmo(event) { const target = event.target;
        const value = target.type === 'checkbox' ? target.checked :
        target.value;
        const name = target.name;
 
        this.setState({
             venmo : value
        })
     }
    handleChangegoogle(event) { const target = event.target;
        const value = target.type === 'checkbox' ? target.checked :
        target.value;
        const name = target.name;
 
        this.setState({
             googlepay : value
        })
     }
    handleChangezelle(event) { const target = event.target;
        const value = target.type === 'checkbox' ? target.checked :
        target.value;
        const name = target.name;
 
        this.setState({
             zelle : value
        })
     }

    updateProfile() {
        let userProfile = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            phone_number: this.state.phone,
            airport_code: this.state.airport,
            google_pay: this.state.googlepay,
            apple_pay: this.state.applepay,
            zelle: this.state.zelle,
            venmo: this.state.venmo
        }

        axios.post('/api/updateuserprofile', userProfile).then(response => {
            console.log('success')
        }).catch(response => {
            console.log('failuare')
        })
    }
    componentWillMount() {
        axios.get('/api/getuserprofile').then(response => {
            console.log(response.data[0])
            this.setState({
                firstName: response.data[0].first_name,
                lastName: response.data[0].last_name,
                email: response.data[0].email,
                phone: response.data[0].phone_number,
                airport: response.data[0].airport_code,
                googlepay: response.data[0].google_pay,
                applepay: response.data[0].apple_pay,
                zelle: response.data[0].zelle,
                venmo: response.data[0].venmo
            })
        })
    }

    render() {

        console.log(this.state.zelle)

        return (

            <div className="edit-profile">
                <Header />


                <div className="profile-input-container">

                    <div>
                        <div className="edit-profile-text">First Name</div>
                        <input value={this.state.firstName} onChange={this.handleChangeName} className="edit-profile-input" />
                    </div>
                    <div>
                        <div className="edit-profile-text">Last Name</div>
                        <input value={this.state.lastName} onChange={this.handleChangeLast} className="edit-profile-input" />
                    </div>
                    <div>
                        <div className="edit-profile-text">E-Mail</div>
                        <input value={this.state.email} onChange={this.handleChangeEmail} className="edit-profile-input" />
                    </div>
                    <div>
                        <div className="edit-profile-text">Phone Number</div>
                        <input value={this.state.phone} onChange={this.handleChangePhone} className="edit-profile-input" type="tel" maxLength="10" />
                    </div>
                    <div>
                        <div className="edit-profile-text">Home Airport</div>
                        <input value={this.state.airport} onChange={this.handleChangeAirport} className="edit-profile-input" maxLength="3" />
                    </div>
                    <div className="p2p-select-title">
                        P2P Payment Preferences
                    </div>

                    <div className="p2p-select-container">

                        <input onChange={this.handleChangeapple} checked={this.state.applepay} type="checkBox" className="p2p-select" />Apple Pay<br />
                        <input onChange={this.handleChangegoogle} checked={this.state.googlepay} type="checkBox" className="p2p-select" />Google Pay<br />
                        <input onChange={this.handleChangezelle} checked={this.state.zelle} type="checkBox" className="p2p-select" />Zelle<br />
                        <input onChange={this.handleChangevenmo} checked={this.state.venmo} type="checkBox" className="p2p-select" />Venmo<br />
                    </div>



                    <div className="edit-profile-button-container">

                        <div className="edit-profile-button">
                            <button className="cancel-button">Cancel</button>
                        </div>
                        <div className="edit-profile-button">
                            <button onClick={() => this.updateProfile()} className="save-button">Save</button>
                        </div>

                    </div>



                </div>


            </div>

        )
    }
}
export default EditProfile
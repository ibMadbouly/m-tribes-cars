
import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Map, Marker, InfoWindow, GoogleApiWrapper} from "google-maps-react";
import axios from 'axios';
import carIcon from '../../assets/carIcon.png';

export class InfoWindowEx extends Component {
    constructor(props) {
        super(props);
        this.infoWindowRef = React.createRef();
        this.onInfoWindowOpen = this
            .onInfoWindowOpen
            .bind(this);
        if (!this.containerElement) {
            this.containerElement = document.createElement(`div`);
        }
    }

    onInfoWindowOpen() {
        ReactDOM.render(React.Children.only(this.props.children), this.containerElement);
        this
            .infoWindowRef
            .current
            .infowindow
            .setContent(this.containerElement);
    }
    render() {
        return (<InfoWindow
            onOpen={this.onInfoWindowOpen}
            ref={this.infoWindowRef}
            {...this.props}/>);
    }
}

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({selectedPlace: props, activeMarker: marker, showingInfoWindow: true});
    };

    componentDidMount() {
        axios
            .get('http://localhost:5555/api/cars')
            .then(response => {
                console.log(response);
                this.setState({cars: response.data.slice(0,50)});
            });
    }
    render() {

        return (
            <div className="map-container">
                <Map
                    google={this.props.google}
                    className={"map"}
                    zoom={12}
                    initialCenter={{
                    lat: 53.59301,
                    lng: 10.07526
                }}>
                    {this
                        .state
                        .cars
                        .map((car) => {
                            return (<Marker
                                onClick={this.onMarkerClick}
                                key={car._id}
                                name ={car.address}
                                icon={carIcon}
                                position={{
                                lng: car.coordinates[0],
                                lat: car.coordinates[1]
                            }}/>);
                        })}
                    <InfoWindowEx
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h5>{this.state.selectedPlace.name }</h5>
                        </div>
                    </InfoWindowEx>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: "AIzaSyC_JnWDAfK2kw8xJTTqWgH33o47eM-jW2U"})(MapContainer);

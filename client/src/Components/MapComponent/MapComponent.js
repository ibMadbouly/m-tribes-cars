import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import axios from 'axios' ;
import carIcon from '../../assets/carIcon.png' ; 



const mapStyles = {
    width: '100%',
    height: '100%'
};

class MapContainer extends Component {
    state = {
        cars: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) => {
        console.log('marker clicked',marker);
        this.setState({showingInfoWindow: true, selectedPlace: props, activeMarker: marker});
        console.log(this.state.showingInfoWindow) ; 
    }

    onClose = (props) => {
        console.log("Closer:" ,props) ; 
        if (this.state.showingInfoWindow) {
            this.setState({showingInfoWindow: false, activeMarker: null});
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5555/api/cars').then(response =>{
             console.log(response) ; 
             this.setState({cars : response.data}) ; 
             //this.forceUpdate();
        });
    }

    render() {
        let {cars} = this.state; 
        console.log(cars) ; 
        let markers = [] ; 
        if(cars.length > 0) {
            console.log('we have now cars in state') ; 
             markers = cars.map(car=>{
                console.log("MAPPING") ; 
                console.log("CAR",car._id);
                let car_marker = 
                                  <Marker 
                                   key  = {car._id}
                                   onClick = {this.onMarkerClick}
                                   name = {car.address}
                                   icon = {carIcon }
                                   position = {{lng: car.coordinates[0] ,lat:car.coordinates[1]}}
                                 >
                                  {<InfoWindow
                                        marker={this.state.activeMarker}
                                        visible={this.state.showingInfoWindow}
                                        onClose = {this.onClose}>
                                        <div>
                                            <h1>{ this.state.selectedPlace.name }</h1>
                                        </div>
                                    </InfoWindow> }
                                 </Marker>              
                return car_marker ;                 
           }); 
        }
        
       
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{
                lat: 53.59301, 
                lng:10.07526
            }}>
                  { markers }
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyC_JnWDAfK2kw8xJTTqWgH33o47eM-jW2U'})(MapContainer);
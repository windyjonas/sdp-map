import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '100%',
};
const filterStyles = {
  position: 'absolute',
  top: '5px'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
              {latitude: 57.372581, longitude: 13.294038, name: 'Sjötofta', year: '2002'},
              {latitude: 54.1003538, longitude: -9.3246004, name: 'Crossmolina', year: '2003'},
              {latitude: 53.320287, longitude: -3.7898318, name: 'Penrhynside', year: '2004'},
              {latitude: 56.3404639, longitude: 10.0181194, name: 'Hadsten', year: '2005'},
              {latitude: 30.2727757, longitude: -97.7522372, name: 'Austin', year: '2006'},
              {latitude: 63.5404939, longitude: 8.4680741, name: 'Hitra', year: '2007'},
              {latitude: 51.5287718, longitude: -0.2416822, name: 'London', year: '2008'},
              {latitude: 60.4321284, longitude: 22.0841271, name: 'Turku', year: '2009'},
              {latitude: 64.8139703, longitude: -23.1442018, name: 'Snæfellsnes', year: '2010'},
              {latitude: 38.2014731, longitude: 13.2701822, name: 'Sferracavallo', year: '2011'},
              {latitude: 40.3664426, longitude: -105.5681676, name: 'Estes Park', year: '2012'},
              {latitude: 52.023013, longitude: 4.8689282, name: 'Oudewater', year: '2013'},
              {latitude: 56.169960, longitude: 10.647926, name: 'Ahl', year: '2014'},
              {latitude: 55.029718, longitude: -8.140500, name: 'Dunlewey', year: '2015'},
              {latitude: 55.9057936, longitude: 12.7166931, name: 'Ven', year: '2016'},
              {latitude: 54.198131, longitude: -2.843141, name: 'Arnside', year: '2017'},
              {latitude: 53.1998817, longitude: 5.8013256, name: 'Leeuwarden', year: '2018'},
              {latitude: 42.899814, longitude: 12.0283849, name: 'Umbria', year: '2019'},
              {latitude: 63.4616076, longitude: 11.0856766, name: 'Hegra', year: '2020'}
            ],
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      toggleText: "Show All"
    }
    this.state.stores.forEach( (store) => {
      store.displayMarker = false;
    });
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={this.onMarkerClick}
     name={store.name}
     year={store.year}
     visible={store.displayMarker}
     />
    })
  }

  yearChanged = (evt) =>{
    let year = evt.target.value;
    let newStores = this.state.stores;
    newStores.forEach( (store) => {
      if ( year === store.year ) {
        store.displayMarker = !store.displayMarker;
      }
    } );
    this.setState({
      stores: newStores
    });
  }

  toggleText = () => {
    let newDisplayMarker;
    if (this.state.toggleText === 'Show All') {
      this.setState({ toggleText: 'Hide All' });
      newDisplayMarker = true;
    } else {
      this.setState({ toggleText: 'Show All' });
      newDisplayMarker = false;
    }
    let checkboxes = document.getElementsByClassName('year-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = newDisplayMarker;
    }
    let newStores = this.state.stores;
    newStores.forEach( (store) => {
      store.displayMarker = newDisplayMarker;
    } );
    this.setState({
      stores: newStores
    });
  }
  displayFilters = () => {
    return this.state.stores.map((store, index) => {
      return <p key={index} className="year-filter"><label htmlFor={'filter' + store.year} >{store.year} <span className="year-name">{store.name}</span></label><input className="year-checkbox" id={'filter' + store.year} onChange={evt => this.yearChanged(evt)} defaultChecked={store.displayMarker}  type="checkbox" value={store.year} /></p>
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      <div style={mapStyles}>
        <Map
          google={this.props.google}
          zoom={3}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -8}}
          mapTypeControl={false}
          fullscreenControl={false}
        >
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <p>{this.state.selectedPlace.year}</p>
            </div>
          </InfoWindow>
        </Map>
        <div style={filterStyles}>
          {this.displayFilters()}
          <button className="toggle-filter" onClick={this.toggleText} id="toggle-filter">{this.state.toggleText}</button>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDybUOBYsgT0CTTQxDAaI9wfyobL5qlO3g')
})(MapContainer);

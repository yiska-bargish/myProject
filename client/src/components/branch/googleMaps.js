import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import React, {useEffect} from 'react';
 import {useDispatch,useSelector} from 'react-redux'
 import action from '../../redux/actions'
 
 function MapGoogle(props) {

   const dispatch = useDispatch()
   const data = useSelector(state => state)


const {lat,lng} = props 

//    useEffect(() => {
//    alert(JSON.stringify(props))
//    }, [])

    return (
  <>
      <Map google={props.google} zoom={14}
            style={{ width: '600px', height: '900px', position: 'relative' }}
            initialCenter={{
                lat: lat,
                lng: lng
              }}
          >
               <Marker name={"Current location"}  position={{lat: lat, lng: lng}}/>
            
         </Map>
   </>
    );
  }
  
  export default GoogleApiWrapper({
    //key api
    // apiKey: "AIzaSyD6F5QF6lVOpgYm_FjJAfrMPKFNB26IYBU"
    apiKey: ""
    ,region: 'EB',
    language: 'EB'
  })(MapGoogle);
  
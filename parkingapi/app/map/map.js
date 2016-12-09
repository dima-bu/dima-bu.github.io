import L from 'leaflet';
import {isObject, map} from 'lodash';
import Order from '../sdk/order-model.js';
import MapStyle from './styles.js';
import Markers from './markers.js';
import Formatter from '../sdk/formatter.js';
import Constant from '../sdk/constants.js';

var IntervalSpy = null,
    version = null;
if (BUILD_VERSION) {
    var version = BUILD_VERSION || null;
}

console.log(version);

const Map = {
    map: null,
    layer: null,
    driverLayer: null,
    center: [],
    createMap(center) {
        this.center = center;
        if(!this.map) {
            this.map = L.map('hive-map').setView(center, 13);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | hive-widget version ' +version
            }).addTo(this.map);
        }
    },
    createLayer(geoJson) {
        if(this.layer) {
            this.map.removeLayer(this.layer);
        }
        this.layer = L.geoJson(geoJson, {
            pointToLayer: function (feature, latlng) {
                var {index, fullName} = feature.properties;
                return L.marker(latlng, {
                    icon: Markers.Point(index, fullName)
                });
            },
            style: function (feature) {
                if (feature.properties && feature.properties.bg) {
                    return MapStyle.RouteBg;
                }
                return MapStyle.Route;
            }
        });

        this.layer.addTo(this.map);
        this.map.fitBounds(this.layer.getBounds(), {padding: [0, 100]});
    },
    showDriver(geoJson) {
        if(this.driverLayer) {
            this.map.removeLayer(this.driverLayer);
        }

        this.driverLayer = L.geoJson(geoJson, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: Markers.CAR_ICON.CAR_FREE()
                });
            }
        });

        this.driverLayer.addTo(this.map);
    },

    clear(){

        if(this.driverLayer) {
            this.map.removeLayer(this.driverLayer);
        }

        if(this.layer) {
            this.map.removeLayer(this.layer);
        }

        this.map.setView(this.center, 13);

    }
};


Order.onRejectOrder(()=> {
    Map.clear();
});

Order.onEstimateUpdate(function(orderRoute) {
    var routes = Order.getFullRoute();
    if(routes.length) {
        var geoJson = map(routes, (route, index) => {
            var name = Formatter.format(route);
            return {
                "type": "Feature",
                "geometry": route.point.coordinates,
                "properties": {
                    "index": index+1,
                    "fullName": name
                }
            }
        });
        if(orderRoute.total) {
            geoJson.push({
                "type": "Feature",
                "properties": {
                  "bg": true
                },
                "geometry": orderRoute.path.line
            });
            geoJson.push({
                "type": "Feature",
                "geometry": orderRoute.path.line
            });
        }
        Map.createLayer(geoJson);
    }
});

Order.onDriverUpdate((resp) => {
    if(resp.assignee && resp.assignee.location) {
        Map.showDriver([{
            "type": "Feature",
            "property": {
                "car": resp.assignee.car,
                "status": resp.assignee.state
            },
            "geometry": resp.assignee.location
        }])
    }
});

export default Map;

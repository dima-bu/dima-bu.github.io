import L from 'leaflet';
import Car from '../view-elems/icons/car.jsx';

export default {
    CAR_ICON: {
        CAR_FREE: function (data) {
            return L.divIcon({
                className: 'map-pin_wrapper -car-free',
                html: "<svg class='map-icon map-pin-md map-pin'>" +
                "   <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-map-pin'></use>" +
                "</svg>" +
                "<svg class='map-icon map-pin_icon car-xmd'>" +
                "<Car/>" +
                "</svg>" +
                "<div class='xsm-bold callsign-tooltip'>"+data+"</div>",
                iconSize: [40, 44],
                iconAnchor: [25, 45]
            })
        },
        CAR_ASSIGN: function(data) {
            return L.divIcon({
                className: 'map-pin_wrapper -car-assigned',
                html: "<svg class='map-icon map-pin-md map-pin'>" +
                "   <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-map-pin'></use>" +
                "</svg>" +
                "<svg class='map-icon map-pin_icon assign-driver-sm'>" +
                "<use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-assign-driver'></use>" +
                "</svg>" +
                "<div class='xsm-bold callsign-tooltip'>"+data+"</div>",
                iconSize: [40, 44],
                iconAnchor: [25, 45]
            })
        },
        CAR_WAITING: function (data) {
            return L.divIcon({
                className: 'map-pin_wrapper -car-waiting',
                html: "<svg class='map-icon map-pin-md map-pin'>" +
                "   <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-map-pin'></use>" +
                "</svg>" +
                "<svg class='map-icon map-pin_icon car-waiting-sm'>" +
                "<use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-car-waiting'></use>" +
                "</svg>" +
                "<div class='xsm-bold callsign-tooltip'>"+data+"</div>",
                iconSize: [40, 44],
                iconAnchor: [25, 45]
            })
        },
        CAR_IN_WORK: function (data) {
            return L.divIcon({
                className: 'map-pin_wrapper -car-in-work',
                html: "<svg class='map-icon map-pin-md map-pin'>" +
                "   <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-map-pin'></use>" +
                "</svg>" +
                "<svg class='map-icon map-pin_icon car-in-work-sm'>" +
                "<use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-car-in-work'></use>" +
                "</svg>" +
                "<div class='xsm-bold callsign-tooltip'>"+data+"</div>",
                iconSize: [40, 44],
                iconAnchor: [25, 45]
            })
        },
        CAR_FROM_WHEELS: function (data) {
            return L.divIcon({
                className: 'map-pin_wrapper -car-from-wheels',
                html: "<svg class='map-icon map-pin-md map-pin'>" +
                "   <use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-map-pin'></use>" +
                "</svg>" +
                "<svg class='map-icon map-pin_icon car-from-wheels'>" +
                "<use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#icon-car-from-wheels'></use>" +
                "</svg>" +
                "<div class='xsm-bold callsign-tooltip'>"+data+"</div>",
                iconSize: [40, 44],
                iconAnchor: [25, 45]
            })
        }
    },
    ROUTE_ICON: {
        getStartIcon: function (name) {
            return L.divIcon({
                className: 'bubble -from',
                html: "<span>" + name + "</span>",
                iconSize: ['auto', 'auto'],
                iconAnchor: [10, 14]
            })
        },
        getFinishIcon: function (name) {
            return L.divIcon({
                className: 'bubble -to',
                html: "<span>" + name + "</span>",
                iconSize: ['auto', 'auto'],
                iconAnchor: [10, 14]
            })
        }
    },
    getByProps: function (props) {
        switch (true) {
            case props.start:
                return this.ROUTE_ICON.getStartIcon(props.title);
            case props.middle:
            case props.finish:
                return this.ROUTE_ICON.getFinishIcon(props.title);
            case props.car:
                if (props.order) {
                    switch (props.order.status) {
                        case 2:
                            return this.CAR_ICON.CAR_ASSIGN(props.shift.callsign);
                        case 3:
                            return this.CAR_ICON.CAR_WAITING(props.shift.callsign);
                        case 4:
                            return this.CAR_ICON.CAR_IN_WORK(props.shift.callsign);
                        case 5:
                            return this.CAR_ICON.CAR_FROM_WHEELS(props.shift.callsign);
                    }
                }
                return this.CAR_ICON.CAR_FREE(props.shift.callsign);
        }
    }
}
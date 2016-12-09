

export default {
    Point: function(index, name, size) {
        return L.divIcon({
            className: '',
            html: `<div class="address-pin_wrapper"><div class="circle -md -border ${(index > 1 ? '-bright' : '')}">${index}</div><div class="address-pin">${name}</div></div>`
        })
    },
    CAR_ICON: {
        CAR_FREE: function () {
            return L.divIcon({
                className: 'map-pin_wrapper -car-free',
                html:
                    "<svg class='map-icon map-pin-md map-pin'>" +
                    "<path d='M32,17c0-8.3-6.7-15-15-15S2,8.7,2,17c0,7.4,5.4,13.5,12.4,14.8L17,38l2.6-6.2C26.6,30.5,32,24.4,32,17z'/>"+
                    "</svg>" +
                    "<svg  class='map-icon map-pin_icon car-xmd' version='1.1' id='Layer_1' class='map-pin' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 20 20'>"+
                    "<path d='M19.5,6.8h-1.7c-0.1,0-0.2,0-0.3,0.1C17,6,16.4,5.3,16,4.9c-0.4-0.4-1.5-0.8-2.8-1V2.3C12,2.2,10.8,2.2,9.9,2.2c-0.9,0-2,0-3.2,0.2v1.6c-1.3,0.2-2.4,0.5-2.9,1c-0.4,0.4-1,1.1-1.5,2C2.2,6.8,2.2,6.8,2.1,6.8H0.4C0.2,6.8,0,7,0,7.2V8c0,0.2,0.2,0.4,0.4,0.5l1,0.2c-0.9,2-1.4,4.6-0.6,7.1v1.5C0.8,17.7,0.9,18,1,18H3c0.1,0,0.2-0.3,0.2-0.8V16c1.7,0.2,4.2,0.4,6.7,0.4c2.4,0,4.9-0.2,6.7-0.4v1.2c0,0.4,0.1,0.8,0.2,0.8h1.9c0.1,0,0.2-0.3,0.2-0.8l0-1.5c0.8-2.5,0.3-5.1-0.6-7.1l1.1-0.2c0.2,0,0.4-0.2,0.4-0.5V7.2C19.8,7,19.7,6.8,19.5,6.8z M3.2,13.1c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4S3.9,13.1,3.2,13.1z M2,9.1c0.7-1.7,1.7-3,2.4-3.7C4.8,5,6.9,4.5,9.9,4.5S15,5,15.4,5.4c0.6,0.6,1.6,2,2.4,3.7C16.2,9.3,13,8.8,9.9,8.8S3.6,9.3,2,9.1z M16.6,13.1c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4S17.4,13.1,16.6,13.1zэ' />"+
                    "</svg>",
                iconSize: [33, 40],
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
}
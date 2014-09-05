
$(function() {
    $.plot($("#graph"), [
        {
            color: '#F8A20F', lines:{lineWidth: 5},
            points: {radius: 8, lineWidth: 3, fillColor: 'white'},
            data: [
                [0.5, 2000], [4, 5000], [8, 4000], [12, 11000], [16, 10000], [18, 23000], [20, 25000], [22, 27000]]
        },
        {
            color: '#4FBCE4', lines:{lineWidth: 5},
            points: {radius: 8, lineWidth: 3, fillColor: 'white'},
            data: [
                [0.5, 20000], [4, 15000], [8, 12000], [12, 18000], [16, 20000], [18, 18000], [20, 15000], [22, 10000]]
        }

    ],
                {   grid: {
                    borderWidth: 1,
                    color: "#F3F3F3"
                    },
                    color: '#F8A20F',
                    interaction: {redrawOverlayInterval: 2},
                    yaxis: { max: 30000, tickColor: '#F3F3F3'},
                    xaxis: { min:0, max: 24, ticks:12, tickColor: '#F3F3F3' },
                    points: {show: true}, lines: {show: true} });});

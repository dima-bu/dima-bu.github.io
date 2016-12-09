var http = {
    send (urlParams, params = {}) {
        var self = this;
        return new Promise(function(resolve, reject) {

            var xhr = createRequest('http://parkingapi.gear.host/v1/parking'+urlParams, params.method);

            xhr.onload = function(resp) {
                if(this.status == 200) {
                    try{
                        if(this.responseText) {
                            resolve(JSON.parse(this.responseText))
                        } else {
                            resolve({})
                        }
                    }catch(e) {
                        //logger.error(e);
                        reject(e)
                    }
                }  else {
                    //logger.error(resp);
                    reject(resp);
                }
            };

            xhr.onerror = function(e) {
                //logger.error(e);
                reject(e);
            };

            params.data = JSON.stringify(params.data);

            xhr.send(params.data);
        })
    }
}


function createRequest(url, method = 'GET') {
    let xhr = new XMLHttpRequest();

    xhr.open(method || "GET", url, true);
    //xhr.setRequestHeader('Content-Type', 'application/json');

    return xhr;
}

export default http;
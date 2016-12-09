var http = {
    context: '',
    globalUrl: '',
    setGlobalUrl (globalUrl) {
        this.globalUrl = globalUrl;
    },
    setContext (context) {
        this.context = context;
    },
    send (url, params = {}) {
        var self = this;
        return new Promise(function(resolve, reject) {

            var xhr = createRequest(self.globalUrl + url, params.method , params.headers == false ? false : params.headers);

            xhr.onload = function(resp) {
                if(this.status == 200) {

                    try{
                        if(this.responseText) {
                            resolve(JSON.parse(this.responseText))
                        } else {
                            resolve({})
                        }
                    }catch(e) {
                        reject(e)
                    }
                }  else {
                    reject(resp);
                }
            };

            xhr.onerror = function(e) {
                reject(e);
            };

            params.data = JSON.stringify(params.data);

            xhr.send(params.data);
        })
    }
}


function createRequest(url, method = 'GET' , header = {}) {
    let xhr = new XMLHttpRequest();

    xhr.open(method || "GET", url, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', true);

    return xhr;
}

export default http;
import axios from 'axios';


const generateBase64 = function(key){
    return new Buffer(key + ":xxx").toString("base64");
}

// let instance = null;

// export 

// export function Init(site, apiKey) {
//     console.log('INIT');
//     console.log(site, apiKey);
//     let base64 = generateBase64(apiKey);
//     instance = axios.create({
//         baseURL: site,
//         headers: {
//             'Authorization': 'BASIC ' + base64
//         }
//     })
//     console.log(instance);
// };


class SingletonFetch {
    constructor() {
        this.instance = null;
    }

    init(site, apiKey) {
        console.log('init started');
        let base64 = generateBase64(apiKey);
        this.instance = axios.create({
            baseURL: site,
            headers: {
                'Authorization': 'BASIC ' + base64
            }
        })
        console.log('init complete');
        console.log(this.instance.get);
    }
}

export default new SingletonFetch();
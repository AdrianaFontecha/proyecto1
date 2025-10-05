  import axios from "axios";

    const ApiDelivery = axios.create({
      baseURL: 'http://192.168.56.1:3  0/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    export { ApiDelivery }
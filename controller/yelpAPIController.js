import api from 'api';

const sdk = api('@yelp-developers/v1.0#2hsur2ylbank95o');
sdk.auth('Bearer Nha6KX2bDIn3g08t3sJ-HZ4rXpPJgQ_oLkiHTZ6nH5ELzcCi-xhDRX6R1qtom4jDoIsDuBCQHc_-ZBTU2xdgiNWI3PGLjIbSKDPNl7G3GrLVFqEPA7bUPpfzxm2RY3Yx');

// Sample url: `/api/businesses?term=piazza&location=seattle`
const findBusinesses = (req, res) => {
    const location = req.query.location;
    const term = req.query.term;
    sdk.v3_business_search({term: term, location: location})
        .then(({data}) => {console.log(data);res.json(data);})
        .catch(err => console.error(err));
}

// Sample url: `/api/business/6I28wDuMBR5WLMqfKxaoeg`
const findBusinessInfoById = (req, res) => {
    const business_id = req.params['bid'];
    sdk.v3_business_info({business_id_or_alias: business_id})
        .then(({ data }) => {console.log(data); res.json(data);})
        .catch(err => console.error(err));
}

const YelpAPIController =  (app) => {
    app.get('/api/businesses', findBusinesses);
    app.get('/api/business/:bid',findBusinessInfoById);
}

export default YelpAPIController;
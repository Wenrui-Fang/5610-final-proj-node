const sdk = api('@yelp-developers/v1.0#2hsur2ylbank95o');
sdk.auth('Bearer Nha6KX2bDIn3g08t3sJ-HZ4rXpPJgQ_oLkiHTZ6nH5ELzcCi-xhDRX6R1qtom4jDoIsDuBCQHc_-ZBTU2xdgiNWI3PGLjIbSKDPNl7G3GrLVFqEPA7bUPpfzxm2RY3Yx');

export const getBusinessDetail = async(bookmark) => {

    let newBookmark = bookmark.toObject(); 
    let businessId = bookmark.businessId;
    sdk.v3_business_info({business_id_or_alias: businessId})
        .then(({ data }) => {
            console.log(data);
            newBookmark = {...newBookmark, business: data};
        })
        .catch(err => console.error(err));
    
        return newBookmark;
}
# 5610-final-proj-node
5610 final project node

## yelpAPIController usage:

* Find businesses support search by term(the keyword such as piazza) and location together.

    - Sample url: `/api/businesses?term=piazza&location=seattle`

    - Sample response: https://gist.github.com/cathyyucs/5f177831eb3fd0a4b9788df926a3914e

    - Currently, returned number of businesses is default by official yelp api at 20.

* Find business detail info by business id

  - Sample url: `/api/business/6I28wDuMBR5WLMqfKxaoeg`

  - Sample response: https://gist.github.com/cathyyucs/69793a2d1675030bdb81e0912039556a


## yelpGrahQLService getBusinessDetails usage:

* Using yelp graphql to query by a list of business IDs and returns a list of business details
  - Sample url: `/api/users/6396079576410537404d272b/bookmarks`
  - Note the location field's subfield's name is `formatted_address`
  - Sample response: https://gist.github.com/cathyyucs/cef12d580c40dcac7a134c116e8ebd2b
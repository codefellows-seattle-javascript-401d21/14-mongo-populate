
## API ROUTES and METHODS

Method: GET

ROUTE: /api/v1/winner

RETURNS: A LIST OF ALL NOTE ITEM IDS

Method: GET

ROUTE: /api/v1/winner/:_id

RETURNS: A JS ITEM WITH THE SPECIFIED WINNER OBJECT

Method: PUT

ROUTE: /api/v1/winner/:_id _id=_id name=name type=type main_lane=main_lane winrate_percent=winrate_percent _id=[ALREADY INSTANTIATED ID]

RETURNS: NOTHING IF SUCCESSFUL

Method: POST

ROUTE: /api/v1/winner/:_id name=name type=type main_lane=main_lane winrate_percent=winrate_percent

RETURNS: A NEW JS ITEM THAT WAS CREATED

Method: DELETE

ROUTE: /api/v1/winner/:_id

RETURNS: NOTHING IF SUCCESSFUL

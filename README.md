'New York Tweets' is a single-page app I built that visualises data on tweets in New York in real-time.

Link: https://gulikholmatova.github.io/new-york-tweets/

Instructions:
The link above should show the data being updated live. It is likely that you will see a static page instead, so if this is the case, please, follow these steps:

1. Follow this link: https://68.183.49.146:4000/api/tweets-ny/hashtags/30.
   In the pop-up 'This connection is not private' window, select 'Show details', then select 'Visit this website'. 
   
2. Now, if you follow the project link https://gulikholmatova.github.io/new-york-tweets/ you should see visualized data on tweets and hashtags as this data partly relies on the API gateway you have now approved in the step 1.

Project summary:
To optimize performance, for the back-end, I used a Digital Ocean remote server which first, collects data using Twitter Developer API, and second, listens to HTTP requests and provides data I ask for through API gateways.

Interestingly, given that Twitter feeds hierarchical data through its API, I use a noSQL MongoDB database to manage data.

Front-end of my application relies on React, Mapbox and Bootstrap. For visual effects, I also use React-Rellax library.

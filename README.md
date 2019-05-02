'New York Tweets' is a single-page app I built that visualises data on tweets in New York in real-time.

Link: http://newyorktweets.live


Project summary:
To optimize performance, for the back-end, I used a Digital Ocean remote server which first, collects data using Twitter Developer API, and second, listens to HTTP requests and provides data I ask for through API gateways.

Interestingly, given that Twitter feeds hierarchical data through its API, I use a noSQL MongoDB database to manage data.

Front-end of my application relies on React, Mapbox and Bootstrap. For visual effects, I also use React-Rellax library.

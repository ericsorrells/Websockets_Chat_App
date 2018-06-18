## Real-Time Bidding App

### Overview:
This real-time bidding application allows users to bid against and send messages to other users in real-time. The app tracks each bid, and alerts users when they are the high bidder. It displays all incoming bids, as well as text-based messages sent from other bidders.

The application broadcasts messages via custom Redux middleware over WebSockets. The middleware examines incoming actions to determine which should be broacast and which should remain local. Incoming messages are then further processed within the context of the apprpriate saga.

### Technologies:
- React
- Redux
- Redux-Saga
- WebSockets
- Create-React-App
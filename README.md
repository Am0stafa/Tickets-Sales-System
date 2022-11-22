
1. ***Introduction***

Your team is tasked with building backend services to handle ticket sales for the Fifa 2022 World Cup in Qatar. Given the huge demand on tickets, it has been decided by the Fifa governance committee that ticket sales can be purchased through several approved websites instead of having one single website to handle all the sales. As such, each team will serve as a separate website that provides a platform for buying official tickets. Each team will start with a master list of games which consists of all the games and total occupancy allowed, amongst other useful information. It is expected that each team will maintain their own copy of the master list and keep it updated. For example, if team/website #1 makes a reservation, that change should be reflected in teams 2..N. Each team can have up to 5 individuals.

2. ***Technology***

The technology stack for the backend services is comprised of:

1) Node.js (Server-Side)
1) MongoDB (NoSQL Database) or PostgresQL (RDBMS)
1) Vercel (Cloud Platform Provider)
2. ***Requirements***

The system shall support the following services:

|**Name**|**Backend**|
| - | - |
|Shop|✓|
|Shop Consumer|✓|
|Reservations|✓|
|Payments|✓|
|Analytics|✓|
|Security|✓|
Below, you will find a general description of each microservice and its respective purpose. More details will be provided in the upcoming milestone.

Shop Microservice:

The shop microservice is responsible for providing ticket availability, recommendations, and prices.

Shop Consumer:

The shop consumer is responsible for listening to messages that are sent over a kafka broker and processing them accordingly. There will be two topics created. The first topic will be used once for sending the initial master list. The second topic will be used by all shop consumers across all teams to share ticket sales.

Reservations Microservice:

The reservations microservice is responsible for booking and allocating tickets. When a ticket is booked, the reservations microservice should produce a message that can be consumed by the shop consumer across all teams so they can update their master list accordingly.

Payments Microservice:

The payments microservice is responsible for processing payments.

Analytics Microservice:

The analytics microservice is responsible for aggregating all bookings and storing them in a data lake to train a machine learning model that can provide interesting recommendations to the shop microservice. For example, if a user is logging in from Latin America, they may be interested in booking tickets for Argentina, Brazil, Costa Rica, Ecuador, Mexico, or Uruguay games. This service can be extended to handle other use-cases which can be defined by each team.

Security Microservice:

The security microservice is responsible for protecting against fraud and/or malicious attacks. It will be up to the team to figure out how to protect their services accordingly. Although, more detail will be provided in upcoming milestones. When evaluating your system, we will try to exploit it for gain or attempt to bring the service down.

3. ***Database***

You are expected to use a single database across all your services with different tables/collections.

***3. Project Schedule & Deliverables***

Your project will consist of four milestones, each worth 25%.

Milestone #1 (Due 11/25): UML component or architecture diagrams showing how your systems will interface and sequence diagrams for each microservice except Security and Analytics. In addition, all database tables/collections should be created with their respective schema/entity relationship. \
Milestone #2 (Due 12/09): Create Shop, Shop Consumer, and Reservations Backend Services.\
Milestone #3 (Due 12/23): Create Backend Payments, Security, and Analytics Services. \
Milestone #4 (Due 01/03): Create Frontend Shop and Reservation Screens. \

Project Evaluations 01/04 - 01/05.

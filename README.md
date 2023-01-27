![Logo](https://i.ibb.co/k4DJxwM/Screen-Shot-2023-01-27-at-5-56-54-PM.png)

## Appendix
Looking for a hassle-free way to get tickets to your favorite events? Look no further! Our state-of-the-art ticket sales application is here to make your life easier. Built using event-driven architecture and the latest security best practices, our app is fast, secure, and reliable. Plus, with our commitment to test-driven development, you can trust that every feature has been rigorously tested to ensure a seamless experience. Don't miss out on the fun – get your tickets today with our cutting-edge application!

## Links
[Main application](https://ticktaka-client.vercel.app/)
[Admin page with statistics](https://ticketaka-admin-dashboard.vercel.app/#/admin/default)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Project requriments

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

**Shop Microservice:**

The shop microservice is responsible for providing ticket availability, recommendations, and prices.

**Shop Consumer**:

The shop consumer is responsible for listening to messages that are sent over a kafka broker and processing them accordingly. There will be two topics created. The first topic will be used once for sending the initial master list. The second topic will be used by all shop consumers across all teams to share ticket sales.

**Reservations Microservice**:

The reservations microservice is responsible for booking and allocating tickets. When a ticket is booked, the reservations microservice should produce a message that can be consumed by the shop consumer across all teams so they can update their master list accordingly.

**Payments Microservice**:

The payments microservice is responsible for processing payments.

**Analytics Microservice**:

The analytics microservice is responsible for aggregating all bookings and storing them in a data lake to train a machine learning model that can provide interesting recommendations to the shop microservice. For example, if a user is logging in from Latin America, they may be interested in booking tickets for Argentina, Brazil, Costa Rica, Ecuador, Mexico, or Uruguay games. This service can be extended to handle other use-cases which can be defined by each team.

**Security Microservice**:

The security microservice is responsible for protecting against fraud and/or malicious attacks. It will be up to the team to figure out how to protect their services accordingly. Although, more detail will be provided in upcoming milestones. When evaluating your system, we will try to exploit it for gain or attempt to bring the service down.

** milestone 2 info

1. Introduction
A portion of your flow requires an asynchronous implementation to facilitate the sale of tickets across
other similar marketplace platforms.
2. Masterlist
The masterlist contains all details related to the games, availability, and pricing. This list will be published
once over a specific kafka topic once the services have been deployed. The message will be published to
the following topics:

- fifa-world-cup-2022-masterlist-dev
- fifa-world-cup-2022-masterlist-prod
2. Shop Consumer
The shop consumer is responsible for listening to messages that are sent over a kafka broker and
processing them accordingly. There will be two topics created. The first topic will be used once for
sending the initial master list. The second topic will be used by all shop consumers across all teams to
share ticket sales. The second topic will handle at least three types of messages:
- TICKET_PENDING
- TICKET_RESERVED
- TICKET_CANCELLED
When a ticket has been submitted for purchase, the /reservation endpoint should publish a message
indicating the ticket is pending. This message will be received by all (ticket platform) consumers at which
point a synchronous call will be made to sp-shop-api to update the masterlist indicating the ticket is
pending. Each ticket is uniquely identified by the matchNumber and category. As taught in your OS
course, we will treat each ticket sale as a “shared resource” and as such follow a semaphore/mutex
approach. Thus, when a ticket is pending, we should have a field/column which maintains PENDING
available count. Initially the reserved & pending count should be the same. If we receive 5 messages for
pending ticket sales on other platforms, we should decrement our pending field/column by 5. Assuming
the initial reserved count was 10, it means we can safely sell 5 tickets on our platform. However, if the
pending count reaches 0, we should indicate “ticket is temporarily unavailable” in the UI. Once the served
count is 0, we should indicate “ticket is sold out” on the UI.
I have created a sample project for your consumer, which can be found here:
https://github.com/desoukya/sp-shop-consumer
One important feature needed in your consumer is to add code to not process messages that have been
published by your producer. This can be accomplished by adding the clientId to the message.


3. Shop API & Producer
The shop service will expose the endpoints needed to allow a user to see available tickets, but also the
necessary endpoints to handle incoming messages from kafka when a message is:

- Pending
- Cancelled
- Reserved (can be same endpoint used by UI)
I have created a sample project for your api & producer, which can be found here:
https://github.com/desoukya/sp-shop-api
4. Security Service
The security service should protect against malicious or suspect activity. As such, each incoming request
into the system should check with the security service if the request is suspect or Ok to process. I will not
provide specific requirements on what the security service should do; however, some sanity checks could
include checking if:
- Request is from bot or belongs to a botnet
- Request is from to a blacklisted ip address
- Request exceeds API rate limit
- Request is suspect so require UI to perform captcha
5. Topics
All the topics in the system are:
- fifa-world-cup-2022-masterlist-dev | fifa-world-cup-2022-masterlist-prod
- fifa-world-cup-2022-ticket-sales-dev | fifa-world-cup-2022-ticket-sales-prod

***3. Project Schedule & Deliverables***

Your project will consist of four milestones, each worth 25%.

Milestone #1 (Due 11/25): UML component or architecture diagrams showing how your systems will interface and sequence diagrams for each microservice except Security and Analytics. In addition, all database tables/collections should be created with their respective schema/entity relationship. \
Milestone #2 (Due 12/09): Create Shop, Shop Consumer, and Reservations Backend Services.\
Milestone #3 (Due 12/23): Create Backend Payments, Security, and Analytics Services. \
Milestone #4 (Due 01/03): Create Frontend Shop and Reservation Screens. \

Project Evaluations 01/04 - 01/05.

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, please reach out to us at https://ticktaka-client.vercel.app/contact

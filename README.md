# Intro
This is a mock up view of how the release tool can be extended to manange deployments of services.  This mock up is provided assuming that there is a backend that provides the data "data models" and the APIs to retrive this data for the UX ("view models")


# Data Models (service)

* PK - partition key
* PKX - part of a composite key
* SK  - sort ket

## Events Data Model
* repo (PK1) 
* env (PK2)
* timestamp (PK3- SortKey)
* deploymentId (PK4 - SortKey)
* repo
* version
* env
* status
* userId

## ServiceDeployHistory

* repo (PK)
* history: (map string to map(string to deployment))
   * {version} -> [{envName}: {ServiceDeployments reference}]

## ServiceDeployments Data Model

* repo (PK1)
* env (PK2)
* version (Sk1 - SortKey)
* startTimestamp
* duration (calculated)
* status
* Url (calculated)
* approvalUrl (calculated)
* JiraTicket

# View Models

### UX Service Deployments View Model
* Ordered by {repo, env}

Columns:
* repo (PK1)
* env (PK2)
* version (PK3 - SortKey)
* startTimestamp
* duration (calculated)
* status
* JiraTicket
* Url (calculated)
* approvalUrl (calculated)


# Questions:
* Does a deployment event in the upper environments create a release Item each time a ticket is deployed?
  * What if there are multiple tickets for a single day?
  * Should the deployments change the state of the release (instead of the ticket state)?

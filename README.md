# Data Models (service)

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
* version (PK3 - SortKey)
* startTimestamp
* duration (calculated)
* status
* Url (calculated)
* approvalUrl (calculated)

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
* Url (calculated)
* approvalUrl (calculated)
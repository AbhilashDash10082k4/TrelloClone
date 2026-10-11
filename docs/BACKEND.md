**Architecture -> Frontend -> API call -> Controller -> Service -> Repository -> DB**
Method Endpoint Purpose
GET /api/v1/orgs List organizations the current user belongs to
POST /api/v1/orgs Create an organization and add the creator as admin
GET /api/v1/orgs/:orgId Fetch one accessible organization
GET /api/v1/orgs/:orgId/projects List projects in an accessible organization
POST /api/v1/orgs/:orgId/projects Create a project in an accessible organization
GET /api/v1/orgs/:orgId/projects/:projectId Fetch one project, ensuring it belongs to that organization
GET /api/v1/projects/:projectId Optional direct project lookup, still authorization-protected

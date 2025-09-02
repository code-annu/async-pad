# Auth Router

1. Register user -> {
   path: '/api/auth/register',
   method: post,
   body: {username, password, name, bio},
   }

2. Login user -> {
   path: '/api/auth/login',
   method: post,
   body: {username, password},
   }

3. Refresh token -> {
   path: '/api/auth/refresh-token',
   method: post,
   body: {refreshToken},
   }

# Document Router

1. Create document -> {
   path: '/api/documents',
   method: post,
   body: {name, content},
   }

2. Update document -> {
   path: '/api/documents/{documentId}',
   method: patch,
   body: {name, content},
   }

3. Get document -> {
   path: '/api/documents/{documentId}',
   method: get,
   }

4. Delete document -> {
   path: '/api/documents/{documentId}',
   method: delete,
   }

5. Document invitation -> {
   path: '/api/documents/{documentId}/{invite}',
   method: post,
   body:{username, message}
   }

# Invitation Router

1. Respond to invitation -> {
   path: '/api/invitations/{invitationId}',
   method: patch,
   body:{accepted}
   }

2. Get invitation details -> {
   path: '/api/invitations/{invitationId}/',
   method: get,
   }

# User Router

1. Get user profile -> {
   path: '/api/users/{username}',
   method: get,
   }

2. Get user documents -> {
   path: '/api/users/{username}/documents',
   method: get,
   }

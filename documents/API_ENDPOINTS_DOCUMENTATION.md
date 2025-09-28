# 🚀 **Flowtim API Endpoints Documentation**

## **Overview**

This document provides a comprehensive list of all API endpoints used in the Flowtim frontend application. The architecture follows Worklenz-inspired patterns with modern React practices.

---

## 📋 **API Base Configuration**

```typescript
Base URL: process.env.VITE_API_BASE_URL
Timeout: 30 seconds
Headers: 
  - Content-Type: application/json
  - Accept: application/json
  - Authorization: Bearer {token} (when available)
Credentials: withCredentials: true
```

---

## 🔐 **Authentication Endpoints**

### **Auth Routes**
```typescript
POST   /auth/login                    // User login
POST   /auth/register                 // User registration  
POST   /auth/logout                   // User logout
POST   /auth/refresh                  // Refresh access token
GET    /auth/google                   // Google OAuth
POST   /auth/forgot-password          // Password reset request
POST   /auth/reset-password           // Reset password
POST   /auth/verify-email            // Email verification
```

---

## 👤 **User Management Endpoints**

### **User Routes**
```typescript
GET    /user/current                  // Get current user info
PUT    /user/profile                  // Update user profile  
PUT    /user/update                   // Update user details
POST   /user/avatar                   // Upload profile picture
GET    /user/preferences              // Get user preferences
PUT    /user/preferences              // Update user preferences
GET    /user/notifications           // Get notifications
GET    /user/activity                // Get user activity log
```

---

## 🏢 **Workspace Management Endpoints**

### **Workspace CRUD**
```typescript
POST   /workspace/create/new                           // Create workspace
GET    /workspace/all                                  // Get all user workspaces
GET    /workspace/{id}                                 // Get workspace by ID
PUT    /workspace/update/{id}                          // Update workspace
DELETE /workspace/delete/{id}                          // Delete workspace
GET    /workspace/{id}/settings                        // Get workspace settings
```

### **Workspace Members**
```typescript
GET    /workspace/members/{id}                         // Get workspace members
POST   /workspace/invite/{id}                          // Invite members
PUT    /workspace/change/member/role/{id}              // Change member role
DELETE /workspace/{id}/members/{memberId}              // Remove member
```

### **Workspace Analytics**
```typescript
GET    /workspace/analytics/{id}                       // Get workspace analytics
GET    /workspace/{id}/reports                         // Get workspace reports
GET    /workspace/{id}/activity                        // Get workspace activity
```

---

## 📂 **Project Management Endpoints**

### **Project CRUD**
```typescript
POST   /project/workspace/{workspaceId}/create                    // Create project
GET    /project/workspace/{workspaceId}/all                       // Get all projects
GET    /project/{projectId}/workspace/{workspaceId}               // Get project by ID
PUT    /project/{projectId}/workspace/{workspaceId}/update        // Update project
DELETE /project/{projectId}/workspace/{workspaceId}/delete        // Delete project
POST   /project/{projectId}/workspace/{workspaceId}/duplicate     // Duplicate project
```

### **Project Members & Analytics**
```typescript
GET    /project/{projectId}/workspace/{workspaceId}/members       // Get project members
GET    /project/{projectId}/workspace/{workspaceId}/analytics     // Get project analytics
GET    /project/templates                                         // Get project templates
```

---

## ✅ **Task Management Endpoints**

### **Task CRUD**
```typescript
POST   /task/project/{projectId}/workspace/{workspaceId}/create              // Create task
GET    /task/workspace/{workspaceId}/all                                     // Get all tasks (with filters)
GET    /task/{taskId}/workspace/{workspaceId}                                // Get task by ID
PUT    /task/{taskId}/project/{projectId}/workspace/{workspaceId}/update     // Update task
DELETE /task/{taskId}/workspace/{workspaceId}/delete                         // Delete task
POST   /task/workspace/{workspaceId}/bulk-update                             // Bulk update tasks
```

### **Task Relations**
```typescript
GET    /task/{taskId}/comments                         // Get task comments
POST   /task/{taskId}/comments                         // Add task comment
GET    /task/{taskId}/attachments                      // Get task attachments  
POST   /task/{taskId}/attachments                      // Add task attachment
GET    /task/{taskId}/subtasks                         // Get subtasks
POST   /task/{taskId}/subtasks                         // Create subtask
GET    /task/{taskId}/time-log                         // Get time logs
POST   /task/{taskId}/time-log                         // Log time entry
```

---

## 👥 **Member Management Endpoints**

### **Member Operations**
```typescript
POST   /member/invite                                           // Send invitation
POST   /member/workspace/{inviteCode}/join                      // Join workspace via invite
DELETE /member/{memberId}/workspace/{workspaceId}/remove        // Remove member
PUT    /member/{memberId}/workspace/{workspaceId}/role          // Update member role
GET    /member/{memberId}/permissions                          // Get member permissions
```

---

## ⏱️ **Time Tracking Endpoints**

### **Time Management**
```typescript
POST   /time-tracking/start                          // Start time tracking
POST   /time-tracking/stop                           // Stop time tracking
GET    /time-tracking/entries                        // Get time entries
GET    /time-tracking/summary                        // Get time summary
GET    /time-tracking/reports                        // Get time reports
GET    /time-tracking/timesheets                     // Get timesheets
POST   /time-tracking/manual-entry                   // Add manual time entry
```

---

## 📊 **Analytics & Reports Endpoints**

### **Analytics**
```typescript
GET    /analytics/dashboard/{workspaceId}                    // Dashboard analytics
GET    /analytics/productivity/{workspaceId}                // Productivity metrics
GET    /analytics/team-performance/{workspaceId}            // Team performance
GET    /analytics/project-insights/{projectId}              // Project insights
POST   /analytics/custom-reports                            // Create custom report
GET    /analytics/export                                    // Export analytics data
```

---

## 📁 **File Management Endpoints**

### **File Operations**
```typescript
POST   /files/upload                                 // Upload file
GET    /files/download/{fileId}                      // Download file
DELETE /files/delete/{fileId}                        // Delete file
GET    /files/list                                   // List files
POST   /files/share/{fileId}                         // Share file
GET    /files/{fileId}/metadata                      // Get file metadata
```

---

## 🔔 **Notification Endpoints**

### **Notification Management**
```typescript
GET    /notifications                                        // Get all notifications
PUT    /notifications/{notificationId}/read                  // Mark as read
PUT    /notifications/mark-all-read                          // Mark all as read
GET    /notifications/settings                               // Get notification settings
PUT    /notifications/settings                               // Update notification settings
POST   /notifications/subscribe                              // Subscribe to notifications
DELETE /notifications/unsubscribe                            // Unsubscribe
```

---

## 🔍 **Search Endpoints**

### **Global Search**
```typescript
GET    /search/global?q={query}                      // Global search
GET    /search/tasks?q={query}                       // Search tasks
GET    /search/projects?q={query}                    // Search projects  
GET    /search/members?q={query}                     // Search members
GET    /search/files?q={query}                       // Search files
```

---

## 🔌 **Integration Endpoints**

### **Third-party Integrations**
```typescript
GET    /integrations                                         // List available integrations
POST   /integrations/connect/{provider}                      // Connect integration
DELETE /integrations/disconnect/{provider}                   // Disconnect integration
GET    /integrations/settings/{provider}                     // Get integration settings
PUT    /integrations/settings/{provider}                     // Update integration settings
```

### **Popular Integrations**
- Slack & Microsoft Teams
- Google Workspace
- Zoom & WebEx
- Dropbox & OneDrive
- GitHub & GitLab
- Jira & Trello

---

## 🛡️ **Admin Endpoints**

### **Admin Operations**
```typescript
GET    /admin/users                                  // Get all users
GET    /admin/workspaces                             // Get all workspaces
GET    /admin/analytics                              // Get admin analytics
GET    /admin/settings                               // Get system settings
PUT    /admin/settings                               // Update system settings
GET    /admin/billing                                // Get billing information
```

---

## 📝 **Query Parameters & Filters**

### **Common Query Parameters**
```typescript
// Pagination
?pageNumber=1&pageSize=20

// Sorting
?sortBy=createdAt&sortOrder=desc

// Filtering
?status=ACTIVE&priority=HIGH&assignedTo=userId

// Search
?keyword=search-term

// Date ranges
?startDate=2024-01-01&endDate=2024-12-31

// Include/Exclude
?includeCompleted=true&includeArchived=false
```

### **Task Filters**
```typescript
?projectId=string
?assignedTo=string
?priority=LOW|MEDIUM|HIGH|URGENT
?status=TODO|IN_PROGRESS|IN_REVIEW|COMPLETED
?dueDate=YYYY-MM-DD
?keyword=string
?showCompleted=boolean
?showOverdue=boolean
```

---

## 🔄 **Response Formats**

### **Standard Response**
```typescript
{
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  errors?: Record<string, string[]>;
}
```

### **Paginated Response**
```typescript
{
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

### **Error Response**
```typescript
{
  success: false;
  message: string;
  error: string;
  code: string;
  status: number;
  details?: any;
}
```

---

## 🚦 **HTTP Status Codes**

```typescript
200 - OK (Success)
201 - Created (Resource created successfully)
204 - No Content (Success with no response body)
400 - Bad Request (Invalid request data)
401 - Unauthorized (Authentication required)
403 - Forbidden (Insufficient permissions)
404 - Not Found (Resource not found)
409 - Conflict (Resource conflict)
422 - Unprocessable Entity (Validation errors)
429 - Too Many Requests (Rate limiting)
500 - Internal Server Error (Server error)
```

---

## 🔐 **Authentication & Authorization**

### **Token Management**
- **Access Token**: JWT token for API authentication
- **Refresh Token**: Long-lived token for access token renewal
- **Token Storage**: localStorage for remember me, sessionStorage otherwise
- **Token Expiry**: Automatic refresh before expiration

### **Permission Levels**
- **Owner**: Full access to workspace
- **Admin**: Administrative access
- **Member**: Standard member access
- **Viewer**: Read-only access

---

## 📡 **Real-time Features**

### **WebSocket Endpoints**
```typescript
WS     /ws/workspace/{workspaceId}             // Workspace updates
WS     /ws/project/{projectId}                 // Project updates  
WS     /ws/task/{taskId}                       // Task updates
WS     /ws/notifications                       // Real-time notifications
```

### **Event Types**
- `task.created`
- `task.updated` 
- `task.completed`
- `project.created`
- `member.joined`
- `notification.new`

---

## 🛠️ **Development Tools**

### **API Testing**
- Use Postman collection
- Swagger/OpenAPI documentation
- Built-in dev tools in browser

### **Rate Limiting**
- 1000 requests per hour per user
- 100 requests per minute for search
- 50 file uploads per hour

### **Caching**
- React Query for client-side caching
- Stale time: 5 minutes for user data
- Stale time: 2 minutes for workspace data
- Stale time: 30 seconds for tasks

---

*This documentation is automatically updated with each API change. Last updated: December 2024*
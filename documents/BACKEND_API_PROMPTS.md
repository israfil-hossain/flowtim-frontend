# Backend API Development Prompts for Flowtim Features

This document provides comprehensive prompts for developing backend APIs for all Phase 2 and Phase 3 features implemented in the Flowtim frontend.

## Phase 2 Features Backend APIs

### 1. Document Management System API

```
Create a comprehensive document management API for the Flowtim project management system. The API should support:

**Core Features:**
- Document CRUD operations (create, read, update, delete)
- Document categorization and tagging system
- Version control for documents
- Document sharing and permissions
- Real-time collaboration tracking
- Document search and filtering

**Database Schema:**
- Documents table with fields: id, title, content, category, tags, created_by, created_at, updated_at, workspace_id, project_id
- DocumentVersions table for version history
- DocumentShares table for sharing permissions
- DocumentCollaborators table for real-time collaboration

**API Endpoints:**
- GET /api/workspaces/:workspaceId/documents - Get all documents with filters
- POST /api/workspaces/:workspaceId/documents - Create new document
- GET /api/workspaces/:workspaceId/documents/:documentId - Get specific document
- PUT /api/workspaces/:workspaceId/documents/:documentId - Update document
- DELETE /api/workspaces/:workspaceId/documents/:documentId - Delete document
- GET /api/workspaces/:workspaceId/documents/:documentId/versions - Get document versions
- POST /api/workspaces/:workspaceId/documents/:documentId/share - Share document
- POST /api/workspaces/:workspaceId/documents/:documentId/collaborate - Start collaboration

**Features to implement:**
- File upload handling for document attachments
- Real-time collaboration using WebSockets
- Document templates
- Export functionality (PDF, Word, etc.)
- Full-text search capabilities
- Permission levels (view, comment, edit, admin)

Use Node.js, Express, MongoDB/PostgreSQL, and implement proper authentication and authorization.
```

### 2. File Management API

```
Develop a file management and sharing API for the Flowtim system with the following requirements:

**Core Features:**
- File upload with drag-and-drop support
- File categorization (images, videos, documents, etc.)
- Folder organization and hierarchy
- File sharing with permission management
- File versioning and backup
- Storage optimization and compression

**Database Schema:**
- Files table: id, filename, original_name, file_path, file_size, mime_type, category, uploaded_by, created_at, workspace_id, project_id, parent_folder_id
- Folders table: id, name, parent_id, workspace_id, created_by, created_at
- FileShares table: id, file_id, shared_with, permission_level, created_at
- FileVersions table for version tracking

**API Endpoints:**
- POST /api/workspaces/:workspaceId/files/upload - Upload files (multipart/form-data)
- GET /api/workspaces/:workspaceId/files - Get files with pagination and filters
- DELETE /api/workspaces/:workspaceId/files/:fileId - Delete file
- POST /api/workspaces/:workspaceId/folders - Create folder
- GET /api/workspaces/:workspaceId/files/:fileId/download - Download file
- POST /api/workspaces/:workspaceId/files/:fileId/share - Share file
- GET /api/workspaces/:workspaceId/files/:fileId/versions - Get file versions

**Technical Requirements:**
- Implement file storage using AWS S3 or local storage
- Add file type validation and virus scanning
- Implement image thumbnail generation
- Add compression for large files
- Support bulk upload operations
- Implement proper CORS handling for file uploads
- Add progress tracking for large file uploads

Use multer for file handling, sharp for image processing, and implement proper security measures.
```

### 3. Team Chat/Messaging API

```
Create a real-time team communication API for the Flowtim project management system:

**Core Features:**
- Real-time messaging using WebSockets
- Channel-based communication
- Direct messaging between team members
- Message reactions and replies
- File attachments in messages
- Message history and search
- Online/offline status tracking

**Database Schema:**
- Channels table: id, name, description, type (public/private), workspace_id, created_by, created_at
- Messages table: id, content, channel_id, sender_id, reply_to_id, created_at, updated_at, is_edited, is_deleted
- MessageReactions table: id, message_id, user_id, emoji, created_at
- ChannelMembers table: id, channel_id, user_id, joined_at, role
- MessageAttachments table: id, message_id, file_id, file_name, file_url

**API Endpoints:**
- GET /api/workspaces/:workspaceId/channels - Get all channels
- POST /api/workspaces/:workspaceId/channels - Create channel
- GET /api/workspaces/:workspaceId/channels/:channelId/messages - Get messages with pagination
- POST /api/workspaces/:workspaceId/channels/:channelId/messages - Send message
- PUT /api/workspaces/:workspaceId/messages/:messageId - Edit message
- DELETE /api/workspaces/:workspaceId/messages/:messageId - Delete message
- POST /api/workspaces/:workspaceId/messages/:messageId/reactions - Add reaction
- GET /api/workspaces/:workspaceId/channels/:channelId/members - Get channel members
- POST /api/workspaces/:workspaceId/channels/:channelId/members - Add member to channel

**WebSocket Events:**
- 'message:new' - New message received
- 'message:edit' - Message edited
- 'message:delete' - Message deleted
- 'reaction:add' - Reaction added
- 'user:typing' - User typing indicator
- 'user:online' - User online status
- 'user:offline' - User offline status

**Technical Implementation:**
- Use Socket.IO for real-time communication
- Implement message pagination and infinite scroll
- Add message search functionality
- Support emoji reactions with Unicode
- Implement typing indicators
- Add message threading for replies
- Include push notifications integration
- Add message encryption for security

Use Socket.IO, Redis for session management, and implement proper rate limiting.
```

### 4. Subtask Management API

```
Extend the existing task API to support hierarchical subtask functionality:

**Enhanced Task Schema:**
- Add parent_task_id field to existing tasks table
- Add subtask_count field for quick counting
- Add completion_percentage calculation
- Add subtask_order for ordering within parent task

**New API Endpoints:**
- GET /api/workspaces/:workspaceId/tasks/:taskId/subtasks - Get all subtasks for a task
- POST /api/workspaces/:workspaceId/tasks/:taskId/subtasks - Create subtask under parent task
- PUT /api/workspaces/:workspaceId/subtasks/:subtaskId - Update subtask
- DELETE /api/workspaces/:workspaceId/subtasks/:subtaskId - Delete subtask
- PUT /api/workspaces/:workspaceId/subtasks/:subtaskId/reorder - Reorder subtasks
- GET /api/workspaces/:workspaceId/tasks/:taskId/progress - Get task progress including subtasks

**Features to implement:**
- Automatic parent task progress calculation based on subtask completion
- Subtask dependency management
- Bulk subtask operations
- Subtask templates
- Nested subtask support (subtasks of subtasks)
- Progress tracking and reporting
- Time tracking inheritance from parent tasks

**Business Logic:**
- When all subtasks are completed, mark parent task as completed
- Calculate parent task progress as percentage of completed subtasks
- Update parent task estimated hours based on subtask estimates
- Cascade status changes when appropriate
- Prevent circular dependencies in subtask hierarchy

Implement proper validation to prevent infinite nesting and circular references.
```

## Phase 3 Features Backend APIs

### 5. Advanced Task Views API

```
Create API endpoints to support advanced task visualization (Kanban, Gantt, etc.):

**Kanban Board API:**
- GET /api/workspaces/:workspaceId/tasks/kanban - Get tasks organized by status columns
- PUT /api/workspaces/:workspaceId/tasks/:taskId/move - Move task between columns
- GET /api/workspaces/:workspaceId/kanban/columns - Get customizable kanban columns
- POST /api/workspaces/:workspaceId/kanban/columns - Create custom column
- PUT /api/workspaces/:workspaceId/kanban/columns/:columnId - Update column
- DELETE /api/workspaces/:workspaceId/kanban/columns/:columnId - Delete column

**Gantt Chart API:**
- GET /api/workspaces/:workspaceId/tasks/gantt - Get tasks with timeline data
- PUT /api/workspaces/:workspaceId/tasks/:taskId/timeline - Update task timeline
- GET /api/workspaces/:workspaceId/projects/:projectId/timeline - Get project timeline
- POST /api/workspaces/:workspaceId/tasks/:taskId/dependencies - Add task dependency
- DELETE /api/workspaces/:workspaceId/tasks/:taskId/dependencies/:dependencyId - Remove dependency

**Database Schema Additions:**
- TaskDependencies table: id, task_id, depends_on_task_id, dependency_type, created_at
- KanbanColumns table: id, workspace_id, name, color, position, status_mapping
- TaskTimelineData table: id, task_id, start_date, end_date, duration, progress_percentage

**Features:**
- Drag-and-drop task movement
- Automatic timeline calculation based on dependencies
- Critical path analysis
- Resource allocation visualization
- Milestone tracking
- Custom view configurations per user/workspace

Implement efficient queries for large datasets and real-time updates via WebSockets.
```

### 6. Notification System API

```
Develop a comprehensive notification system for the Flowtim platform:

**Core Features:**
- Real-time notifications via WebSockets and push notifications
- Multiple notification types (task assigned, due dates, mentions, comments, etc.)
- Notification preferences per user
- Email and browser push notification delivery
- Notification history and management

**Database Schema:**
- Notifications table: id, type, title, message, recipient_id, sender_id, is_read, priority, created_at, action_url, related_task_id, related_project_id
- NotificationPreferences table: id, user_id, notification_type, email_enabled, push_enabled, in_app_enabled
- NotificationDelivery table: id, notification_id, delivery_method, delivered_at, status

**API Endpoints:**
- GET /api/users/:userId/notifications - Get user notifications with pagination
- PUT /api/users/:userId/notifications/:notificationId/read - Mark notification as read
- PUT /api/users/:userId/notifications/mark-all-read - Mark all notifications as read
- DELETE /api/users/:userId/notifications/:notificationId - Delete notification
- GET /api/users/:userId/notification-preferences - Get user notification preferences
- PUT /api/users/:userId/notification-preferences - Update notification preferences
- POST /api/notifications/send - Internal API for sending notifications

**Notification Types:**
- TASK_ASSIGNED - User assigned to task
- TASK_DUE - Task due date approaching
- MENTION - User mentioned in comment/message
- COMMENT - Comment on user's task
- PROJECT_UPDATE - Project status change
- SYSTEM - System announcements
- REMINDER - Custom reminders

**Technical Implementation:**
- Use WebSockets for real-time delivery
- Implement email notifications using SendGrid/AWS SES
- Add browser push notifications using Web Push API
- Create notification queuing system using Redis/Bull
- Implement notification batching to prevent spam
- Add notification templates for consistent formatting
- Support notification scheduling and delays

**Background Jobs:**
- Process notification queue
- Send digest emails (daily/weekly summaries)
- Clean up old notifications
- Handle notification delivery failures and retries

Use a job queue system like Bull or Agenda for background processing.
```

### 7. Project Templates API

```
Create a project template system to accelerate project creation:

**Core Features:**
- Pre-built project templates with tasks and workflows
- Custom template creation and sharing
- Template categorization and tagging
- Template marketplace/sharing between workspaces
- Template versioning and updates

**Database Schema:**
- ProjectTemplates table: id, name, description, category, created_by, is_public, created_at, updated_at, tags, estimated_duration, version
- TemplatePhases table: id, template_id, name, description, order, duration_days
- TemplateTasks table: id, template_id, phase_id, title, description, priority, estimated_hours, order, dependencies
- TemplateUsage table: id, template_id, workspace_id, project_id, used_at, user_id

**API Endpoints:**
- GET /api/templates - Get public templates with filters and categories
- GET /api/workspaces/:workspaceId/templates - Get workspace-specific templates
- POST /api/workspaces/:workspaceId/templates - Create custom template
- GET /api/templates/:templateId - Get template details with tasks and phases
- POST /api/workspaces/:workspaceId/projects/from-template/:templateId - Create project from template
- PUT /api/workspaces/:workspaceId/templates/:templateId - Update custom template
- DELETE /api/workspaces/:workspaceId/templates/:templateId - Delete custom template
- POST /api/templates/:templateId/favorite - Add template to favorites
- GET /api/templates/popular - Get most used templates
- GET /api/templates/categories - Get template categories

**Template Features:**
- Template preview with task breakdown
- Customizable task assignments during project creation
- Template rating and reviews
- Template usage analytics
- Template export/import functionality
- Automatic template suggestions based on workspace activity

**Business Logic:**
- When creating project from template, copy all tasks with proper relationships
- Adjust task due dates based on project start date
- Allow customization of template during project creation
- Track template usage for analytics
- Support template versioning and updates
- Implement template validation to ensure consistency

Include template seeding for common project types (web development, marketing campaigns, etc.).
```

### 8. Advanced Analytics API

```
Build a comprehensive analytics and reporting system for project insights:

**Core Analytics Features:**
- Productivity metrics and KPIs
- Team performance analytics
- Project health monitoring
- Time tracking analysis
- Burndown and burnup charts
- Custom dashboard creation

**Database Schema:**
- Analytics table: id, workspace_id, metric_type, metric_value, recorded_at, metadata
- DashboardWidgets table: id, user_id, widget_type, config, position, created_at
- ReportSchedules table: id, user_id, report_type, schedule, recipients, config

**API Endpoints:**
- GET /api/workspaces/:workspaceId/analytics/overview - Get key metrics overview
- GET /api/workspaces/:workspaceId/analytics/productivity - Get productivity metrics
- GET /api/workspaces/:workspaceId/analytics/team-performance - Get team analytics
- GET /api/workspaces/:workspaceId/analytics/project-health - Get project health metrics
- GET /api/workspaces/:workspaceId/analytics/time-tracking - Get time tracking analytics
- GET /api/workspaces/:workspaceId/analytics/burndown/:projectId - Get burndown chart data
- POST /api/workspaces/:workspaceId/analytics/custom-report - Generate custom report
- GET /api/users/:userId/dashboard/widgets - Get user dashboard configuration
- POST /api/users/:userId/dashboard/widgets - Add dashboard widget
- PUT /api/users/:userId/dashboard/widgets/:widgetId - Update widget
- DELETE /api/users/:userId/dashboard/widgets/:widgetId - Remove widget

**Analytics Metrics:**
- Task completion rates
- Average task completion time
- Team velocity and capacity
- Project timeline adherence
- Resource utilization
- Bottleneck identification
- Workload distribution
- Sprint/milestone progress

**Technical Implementation:**
- Use aggregation pipelines for complex analytics queries
- Implement data caching for frequently accessed metrics
- Create background jobs for analytics data processing
- Support real-time analytics updates
- Add data export capabilities (CSV, PDF, Excel)
- Implement custom date range filtering
- Support metric comparisons over time periods

**Report Generation:**
- Automated report scheduling
- Email report delivery
- Custom report templates
- Interactive chart generation
- Data visualization recommendations
- Benchmark comparisons

Use libraries like Chart.js data preparation and implement efficient querying for large datasets.
```

### 9. Advanced Automation API

```
Create workflow automation and trigger system for task management:

**Core Features:**
- Rule-based task automation
- Trigger-based actions
- Workflow templates
- Custom automation rules
- Integration webhooks

**Database Schema:**
- AutomationRules table: id, workspace_id, name, trigger_type, trigger_conditions, actions, is_active, created_by
- AutomationTriggers table: id, rule_id, trigger_event, conditions, created_at
- AutomationActions table: id, rule_id, action_type, action_config, order
- AutomationLogs table: id, rule_id, triggered_at, trigger_data, actions_executed, status

**API Endpoints:**
- GET /api/workspaces/:workspaceId/automations - Get automation rules
- POST /api/workspaces/:workspaceId/automations - Create automation rule
- PUT /api/workspaces/:workspaceId/automations/:ruleId - Update automation rule
- DELETE /api/workspaces/:workspaceId/automations/:ruleId - Delete automation rule
- POST /api/workspaces/:workspaceId/automations/:ruleId/test - Test automation rule
- GET /api/workspaces/:workspaceId/automations/:ruleId/logs - Get automation logs
- POST /api/workspaces/:workspaceId/webhooks - Create webhook
- GET /api/workspaces/:workspaceId/automation-templates - Get automation templates

**Automation Triggers:**
- Task status changed
- Task assigned
- Due date approaching
- Task completed
- Comment added
- Time tracked
- Custom field updated

**Automation Actions:**
- Assign task to user
- Change task status
- Set due date
- Add comment
- Send notification
- Create subtask
- Move to project
- Send webhook
- Send email

**Implementation:**
- Event-driven architecture for trigger detection
- Rule engine for condition evaluation
- Action executor with rollback capability
- Automation scheduling and delays
- Error handling and retry mechanisms
- Audit logging for all automation activities

Use an event bus pattern and implement proper error handling for failed automations.
```

## General Backend Requirements

### Authentication & Authorization
```
Implement JWT-based authentication with the following features:
- User registration and login
- Workspace-based permissions
- Role-based access control (Admin, Manager, Member, Viewer)
- Session management and refresh tokens
- API rate limiting
- Input validation and sanitization
- CORS configuration
```

### Database Design
```
Use either MongoDB or PostgreSQL with:
- Proper indexing for performance
- Database migrations system
- Connection pooling
- Backup and recovery procedures
- Data archiving for old records
- Database monitoring and logging
```

### API Standards
```
Follow REST API best practices:
- Consistent URL naming conventions
- Proper HTTP status codes
- Request/response validation using Joi or Yup
- API documentation using Swagger/OpenAPI
- Error handling middleware
- Logging middleware
- Pagination for list endpoints
- Filtering, sorting, and searching capabilities
```

### Security
```
Implement comprehensive security measures:
- Input sanitization and validation
- SQL injection prevention
- XSS protection
- CSRF protection
- File upload security
- Environment variable management
- Secret key rotation
- API key management for integrations
```

### Performance & Scalability
```
Optimize for performance:
- Database query optimization
- Caching with Redis
- Image optimization and CDN integration
- Background job processing
- Load balancing considerations
- Database connection pooling
- API response compression
```

### Testing
```
Implement comprehensive testing:
- Unit tests for business logic
- Integration tests for API endpoints
- Database transaction testing
- Authentication and authorization testing
- File upload and processing testing
- WebSocket connection testing
- Performance testing for high load scenarios
```

## Deployment Instructions

### Environment Setup
```bash
# Required environment variables
NODE_ENV=production
DATABASE_URL=your_database_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_secret
UPLOAD_BUCKET=your_s3_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Docker Configuration
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

This comprehensive set of API prompts covers all the features implemented in the frontend and provides a solid foundation for backend development. Each section includes detailed requirements, database schemas, API endpoints, and implementation considerations.
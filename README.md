# MEAN Chat System - README

## Git Repository Organization and Usage

My Git repository is structured into two main directories: `frontend` and `server`. The `frontend` directory contains the Angular application, while the `server` directory contains the Node.js server code.

### Branching Strategy

I followed a feature-branching strategy to maintain code quality and ensure smooth collaboration. The **main** branch was reserved for stable releases. Development of new features, bug fixes, or enhancements was done in separate feature branches. After thorough testing and code review, these feature branches were merged into the **main** branch. This allowed me to maintain a clean and functional codebase.

### Update Frequency

I ensured that commits were made frequently and consistently during development. Each commit reflected small, incremental changes, making it easy to track progress and identify the source of issues. Descriptive commit messages were used to provide a clear understanding of each change, promoting transparency and accountability.

## Directory Structure

The repository is organized as follows:

```plaintext
.DS_Store
.gitignore
frontend/
    .angular/
    .cache/
    .vscode/
    angular.json
    package.json
    public/
    README.md
    src/
        app/
            app-routing.module.ts
            app.component.css
            app.component.html
            app.component.spec.ts
            ...
        index.html
        main.ts
        styles.scss
    tsconfig.app.json
    tsconfig.json
    tsconfig.spec.json
package.json
README.md
server/
    data.json
    listen.js
    server.js
    sockets.js
```

- **Frontend**: Contains the Angular frontend application responsible for user interaction and presenting the UI.
- **Server**: Contains the Node.js server that handles API requests, manages data storage, and enables real-time communication using Socket.io.
  
## Data Structures

The following describes the data structures used in both the client (Angular) and server (Node.js) sides.

### Client-Side (Angular)

- **Users**: Represented by the `User` model in `frontend/src/app/models/user.model.ts`. The structure contains fields like:
  - `id`: A unique identifier for the user.
  - `username`: The user's username.
  - `password`: The user's hashed password.
  - `email`: The user's email address.

- **Groups**: Represented by the `Group` model in `frontend/src/app/models/group.model.ts`. The structure contains fields like:
  - `id`: A unique identifier for the group.
  - `name`: The group name.
  - `members`: An array of user IDs representing the group members.

- **Channels**: Represented by the `Channel` model in `frontend/src/app/models/channel.model.ts`. The structure contains fields like:
  - `id`: A unique identifier for the channel.
  - `name`: The channel name.
  - `groupId`: The ID of the group the channel belongs to.

### Server-Side (Node.js)

- **Users**: Stored in `data.json` under the `users` array. Each user object contains the following fields:
  - `id`: A unique identifier for the user.
  - `username`: The user's username.
  - `password`: The user's hashed password.
  - `email`: The user's email.

- **Groups**: Stored in `data.json` under the `groups` array. Each group object contains:
  - `id`: A unique identifier for the group.
  - `name`: The group's name.
  - `members`: An array of user IDs that are members of the group.

- **Channels**: Stored in `data.json` under the `channels` array. Each channel object contains:
  - `id`: A unique identifier for the channel.
  - `name`: The channel name.
  - `groupId`: The ID of the group the channel is associated with.

## Angular Architecture

The Angular frontend is designed following a component-service architecture, with clear separation of concerns.

### Components

1. **AppComponent**: The root component that initializes the application.
2. **LoginComponent**: Handles user authentication.
3. **GroupManagementComponent**: Manages groups and displays group members.
4. **ChatComponent**: Manages chat functionalities such as displaying messages and sending them in real-time.
5. **ChannelSelectionComponent**: Allows users to select and switch between different channels.
6. **ManageUsersComponent**: Handles user account management, including user creation, promotion and deletion.

### Services

1. **AuthService**: Handles authentication and user session management. Manages login and logout, and communicates with the backend for session persistence.
2. **UserService**: Manages user-related operations, such as creating, updating, or deleting users.
3. **GroupService**: Manages group-related operations like creating groups, fetching group details, and adding members.
4. **ChannelService**: Handles operations related to channels, such as fetching channel lists, switching between channels, and messaging.

### Models

1. **User**: Represents a user entity with fields for `id`, `username`, `password`, and `email`.
2. **Group**: Represents a group entity with fields for `id`, `name`, and `members`.
3. **Channel**: Represents a channel entity with fields for `id`, `name`, and `groupId`.

### Routes

Routes are defined in `app-routing.module.ts` to navigate between different components. These routes allow users to move between login, group management, channel selection, and chat functionalities.

## Node.js Server Architecture

The Node.js server handles API requests and real-time communication using a combination of core modules and third-party libraries.

### Modules

- **Express**: Used to create the server and handle HTTP requests.
- **Socket.io**: Facilitates real-time communication between the client and server for chat functionality.
- **CORS**: Enables Cross-Origin Resource Sharing for secure communication between the frontend and backend.
- **FS (File System)**: Used for reading from and writing to `data.json`, which stores users, groups, and channels.

### Functions

1. **saveData**: This function writes the current state of users, groups, and channels to `data.json` to ensure data persistence.
2. **init**: Initializes Socket.io and sets up event listeners for real-time communication.

### Files

1. **server.js**: Main server file that sets up routes, middleware, and starts the server.
2. **sockets.js**: Handles Socket.io initialization and events for real-time communication.
3. **listen.js**: The entry point that starts the server and listens for incoming requests.

### Global Variables

- **data**: An in-memory object that holds the current state of users, groups, and channels. This is periodically saved to `data.json`.

## Server-Side Routes

### Authentication

- **POST /api/login**
  - **Parameters**: `username`, `password`
  - **Return Values**: 200 OK with user data if credentials are valid, 401 Unauthorized if invalid
  - **Purpose**: Authenticates the user and returns the user’s data if the login is successful.

### User Management

- **POST /api/users**
  - **Parameters**: `username`, `password`, `email`
  - **Return Values**: 201 Created with user data
  - **Purpose**: Creates a new user and adds them to the user list.

### Group Management

- **GET /api/groups**
  - **Return Values**: 200 OK with a list of groups
  - **Purpose**: Fetches all groups available in the system.

### Channel Management

- **GET /api/channels**
  - **Return Values**: 200 OK with a list of channels
  - **Purpose**: Fetches all channels available under a specific group.

## Client-Server Interaction

### Login

1. **Client**: Sends a POST request to `/api/login` with `username` and `password`.
2. **Server**: Validates the credentials against stored users.
3. **Client**: If the login is successful, the server responds with user data, which is stored locally. The UI updates to reflect the user’s logged-in state.

### Group Management

1. **Client**: Sends a GET request to `/api/groups` to fetch available groups.
2. **Server**: Responds with the list of groups from `data.json`.
3. **Client**: The `GroupManagementComponent` displays the groups and their members.

### Channel Management

1. **Client**: Sends a GET request to `/api/channels` to fetch channels associated with a selected group.
2. **Server**: Responds with the list of channels.
3. **Client**: The `ChannelSelectionComponent` displays the channels and allows users to switch between them.

### Real-Time Communication

1. **Client**: Connects to the server using Socket.io.
2. **Server**: Listens for events, such as new messages.
3. **Client**: The chat UI updates in real-time with new messages from other users, ensuring a seamless chat experience.

### Video Chat

- **Client**: Initiates video chat by calling the `startVideoChat` method.
- **Server**: Facilitates WebRTC signaling for peer-to-peer connection.
- **Client**: Streams video and audio between peers.

### Image Upload

- **Client**: Selects an image file and sends it to the server via a POST request to `/upload/chat`.
- **Server**: Handles the file upload and responds with the file path.
- **Client**: Displays the uploaded image in the chat.

## Testing

### Unit Tests

Unit tests are executed via Karma. To run the unit tests, use the following command:

```bash
ng test

### End-to-End Tests

End-to-end tests are executed via a platform of your choice. To run the end-to-end tests, use the following command:

```bash
ng e2e

### Configuration

The testing configuration is defined in the `karma.conf.js` file. This file includes settings for reporters, code coverage, and the browsers used for testing.



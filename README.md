## Fogo Cruzado Data Visualization App

### Overview

This application is designed to fetch, process, and visualize data from the Fogo
Cruzado API, a platform tracking occurrences of violence. It aims to present a
heatmap visualization representing the geographic distribution of these
occurrences.

### Key Features

API Data Fetching and Processing: Integration with the Fogo Cruzado API to
retrieve occurrence data, focusing on events with police action and agent
presence. Data is processed and stored using Django models.

Heatmap Visualization: A heatmap visualization is implemented in the frontend
using the Google Maps API. The heatmap represents the intensity and location of
violence occurrences.

### Technologies Used

Backend: Django (Python)

Frontend: Next.js (JavaScript/TypeScript)

Mapping API: Google Maps API with @react-google-maps/api

### Setup and Installation

#### Backend Setup

Install Django and required dependencies.

Configure the Django service to connect with the Fogo Cruzado API.

Set up environment variables for API credentials.

#### Frontend Setup

Set up the Next app.

Install @react-google-maps/api.

Configure the Google Maps API key in the environment variables.

#### Running the Application

Start the Django server to process and serve the API data.

Run the Next app to visualize the data on a heatmap.

### Challenges and Solutions

JSON Field Handling: Overcame challenges in serializing and deserializing JSON
fields (contextInfo and victims) in the Django model.

Heatmap Rendering: Addressed issues related to library compatibility and
server-side rendering constraints in the Remix framework.

Environment Configuration: Ensured correct handling of environment variables,
particularly for the Google Maps API key.

## Current State of the Application

### Backend:

We have set up a Django application that serves as the backend.
The backend is responsible for communicating with the Fogo Cruzado API, fetching occurrence data, and processing it.
The processed data is then provided via a custom endpoint (/fogo_cruzado/occurrences/), which returns a JSON array of occurrence objects.

### Frontend:

A Next.js application has been created as the frontend.
The frontend includes a heatmap component that utilizes the Google Maps JavaScript API to render a heatmap layer.
The heatmap data is fetched from the backend Django application using the custom endpoint.
The data fetched is transformed into a format suitable for the Google Maps visualization library and passed to the Heatmap component for rendering.


## Documentation

### Heatmap Component (Heatmap.tsx):

Renders a Google Maps instance with a heatmap layer.
Accepts data prop, which is an array of occurrences with latitude, longitude, and optional weight.
Utilizes the useJsApiLoader hook to asynchronously load the Google Maps JavaScript API.
Once the API is loaded and the map instance is ready, the heatmap layer is created with the provided data.
The useEffect hook is used to watch for changes in the map instance and the data, updating the heatmap layer accordingly.
Data Fetching and Page Component (Page.tsx):
Asynchronously fetches occurrence data from the backend when the component mounts using useEffect and useState.
The getData function handles the fetching logic, transforming the response into the expected format and handling any errors.
The fetched data is stored in state and passed to the Heatmap component as a prop.

## Next Steps
Moving forward, here are some potential enhancements and functionalities that could be added to the project:

### Filtering and Search Functionality:

Implement functionality to filter occurrences based on various criteria such as date range, type of incident, etc.
Add a search bar to allow users to find specific locations or occurrences.
Data Refresh and Real-time Updates:

Set up a mechanism to periodically refresh the data, ensuring the heatmap displays up-to-date information.
Explore possibilities for integrating real-time updates if the Fogo Cruzado API supports it.


### User Interaction:

Allow users to click on heatmap points to view detailed information about each occurrence.
Integrate a sidebar or modal to display occurrence details when an area of the heatmap is selected.
User Preferences and Settings:

Implement user settings to customize the heatmap display, such as adjusting the intensity or color scheme.
Save user preferences in local storage or a user profile if authentication is added.
Responsiveness and Mobile Compatibility:

Ensure the application is fully responsive and provides a good user experience on mobile devices.
Consider adding touch gestures for navigation and interaction on touch-enabled devices.
Performance Optimization:

Optimize the loading and rendering of the heatmap for large datasets to improve performance.
Implement lazy loading or pagination for fetching data in manageable chunks.


### Accessibility:

Ensure that the application is accessible, providing alternative text for screen readers and ensuring keyboard navigability.

### Future Enhancements

coming soon... 

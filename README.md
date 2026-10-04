# CanSat-Ground-Control-Station
A web-based CanSat Ground Control Station (GCS) developed using HTML, CSS, and JavaScript. Features simulated real-time telemetry monitoring, interactive graphs, GPS tracking, 3D orientation visualization, live video streaming, error detection, and CSV/graph export for mission analysis. Built with Chart.js, Leaflet.js, and Three.js.

## Features

* **Live Telemetry Simulation:** Displays simulated CanSat telemetry, including altitude, temperature, atmospheric pressure, battery level, GPS coordinates, and roll, pitch, and yaw.
* **Mission Timer:** Tracks mission duration with start and stop controls.
* **Real-Time Graphs:** Uses Chart.js to visualize altitude, temperature, pressure, and battery variations over time.
* **GPS Tracking:** Displays the simulated CanSat location on an interactive map using Leaflet.js and OpenStreetMap.
* **3D Orientation Visualization:** Uses Three.js to render a 3D CanSat model that rotates according to simulated roll, pitch, and yaw values.
* **Error Detection:** Displays error codes based on simulated telemetry conditions, such as low battery and descent-rate thresholds.
* **Telemetry Logging:** Records telemetry data and allows users to export the collected data as a CSV file for further analysis.
* **Graph Export:** Allows all four telemetry graphs to be exported together as a single PNG image.
* **Live Camera Feed:** Supports webcam access through the browser, with camera selection, start/stop controls, and stream status.
* **Interactive Dashboard:** Provides a centralized interface for monitoring simulated mission parameters.

## Technologies Used

| Technology       | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| HTML5            | Structuring the dashboard                        |
| CSS3             | Styling and layout                               |
| JavaScript       | Telemetry simulation and dashboard functionality |
| Chart.js         | Real-time telemetry graphs                       |
| Leaflet.js       | Interactive GPS map                              |
| OpenStreetMap    | Map tiles                                        |
| Three.js         | 3D CanSat orientation visualization              |
| MediaDevices API | Webcam access and camera selection               |
| CSV              | Telemetry data export                            |

## System Architecture

The GCS is designed as a browser-based application in which JavaScript generates simulated telemetry data and updates the dashboard.

1. **Telemetry Simulation:** JavaScript periodically generates simulated altitude, temperature, pressure, battery, GPS, and orientation values.
2. **Data Processing:** The generated values are processed to calculate parameters such as descent rate and to check for predefined error conditions.
3. **Visualization:** The dashboard updates the telemetry displays, graphs, map marker, and 3D CanSat model.
4. **Data Logging:** Telemetry readings are stored during the simulation and can be exported as a CSV file.
5. **Camera Integration:** The browser's MediaDevices API provides access to a connected webcam, allowing a live video feed to be displayed in the dashboard.

## Working Principle

The application simulates the operation of a CanSat Ground Control Station by generating telemetry data at regular intervals. The simulated values are displayed on the dashboard and updated dynamically.

The altitude data is used to estimate the descent rate, while the battery and other telemetry values are monitored for predefined conditions. The GPS coordinates are simulated and used to update the marker on the interactive map. Similarly, roll, pitch, and yaw values control the orientation of the 3D CanSat model.

Telemetry readings are logged throughout the simulation, enabling users to export and analyze the collected data. The webcam feature operates separately through browser-based camera access.

## Getting Started

### Prerequisites

* A modern web browser such as Google Chrome, Microsoft Edge, or Firefox
* A code editor such as Visual Studio Code
* An internet connection to load external libraries and map tiles
* A webcam, if the live camera feature is to be used

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-folder>
   ```

3. Open the project in Visual Studio Code.

4. Run the HTML file using the **Live Server** extension or another local web server.

5. Open the provided local URL in your browser to access the dashboard.

## Usage

1. Open the GCS dashboard in your browser.
2. Start the telemetry simulation using the Start control.
3. Monitor the changing telemetry values and their corresponding graphs.
4. Observe the simulated location on the GPS map and the CanSat's orientation in the 3D visualization.
5. Monitor the error status for any simulated abnormal conditions.
6. Use the camera controls to select and start a webcam feed, if required.
7. Export telemetry data as a CSV file or save the graphs as a PNG image for analysis.
8. Stop the simulation when monitoring is complete.

## Project Limitations

* The current implementation uses simulated telemetry rather than data received from a physical CanSat.
* GPS coordinates and orientation values are generated for demonstration purposes and do not represent actual sensor measurements.
* Error detection is based on predefined simulated conditions and is not a validated flight-safety system.
* The camera feature uses a locally accessible webcam and is not connected to a remote CanSat camera.
* Wireless communication, physical sensors, and hardware-based payload control have not yet been integrated.

## Future Enhancements

* Integrate physical CanSat hardware and sensors for actual telemetry acquisition.
* Establish wireless communication using LoRa, XBee, or another suitable radio module.
* Implement real-time GPS tracking using a hardware GPS module.
* Add reliable command transmission and acknowledgement for payload operations.
* Introduce telemetry playback and mission-history analysis.
* Enhance error detection with additional thresholds and sensor validation.
* Explore cloud-based storage and remote monitoring.

## Applications

* Educational CanSat and satellite simulation projects
* Ground station interface prototyping
* Telemetry visualization and monitoring
* Testing dashboard features before hardware integration
* Demonstrations of embedded systems, data visualization, and web-based monitoring

## Conclusion

This project demonstrates a browser-based CanSat Ground Control Station with simulated telemetry monitoring, interactive data visualization, GPS mapping, 3D orientation tracking, camera access, and data export functionality. The modular design provides a foundation for future integration with physical CanSat hardware and wireless communication systems.

## Author

**Shruthi Narayanan**

const descentRateDisplay =
document.getElementById("descent-rate");

const altitude= document.getElementById("altitude");
let altitudeval=500;

let previousAltitude = altitudeval;
let descentRate = 0;

let temperatureDisplay= document.getElementById("temperature");
let tempval = 25;

let pressureDisplay= document.getElementById("pressure");
let pressureval = 1013

let batteryDisplay= document.getElementById("battery");
let batteryval = 100

let latitudeDisplay= document.getElementById("latitude");
let latitudeval = 12.9716;

let longitudeDisplay= document.getElementById("longitude");
let longitudeval = 80.2200;

let rollDisplay= document.getElementById("roll");
let rollval = 0;

let pitchDisplay= document.getElementById("pitch");
let pitchval = 0;

let yawDisplay= document.getElementById("yaw");
let yawval = 0; 

let packetDisplay= document.getElementById("packet");
let packetval = 0;

let telemetryLog =[];

const errorCodeDisplay = document.getElementById("error-display");

const ExportGraph = document.getElementById("exportG-btn");
ExportGraph.addEventListener("click", function(){
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = 1200;
    exportCanvas.height = 800;
    const context = exportCanvas.getContext("2d");
    context.fillStyle = "#1f2d3d";
    context.fillRect(0,0,exportCanvas.width,exportCanvas.height);
    context.drawImage(altitudeChartCanvas,20,20,550,350);
    context.drawImage(tempChartCanvas,630,20,550,350);
    context.drawImage(pressureChartCanvas,20,420,550,350);
    context.drawImage(batteryChartCanvas,630,420,550,350);
    const image = exportCanvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = image;
    downloadLink.download = "telemetry_graphs.png";
    downloadLink.click();   
});

const camera = document.getElementById("camera");
const cameraSelect = document.getElementById("camera-select");
const startCameraButton = document.getElementById("start-camera");
const stopCameraButton = document.getElementById("stop-camera");
const cameraStatus = document.getElementById("camera-status");

let currentStream = null;

const MissionDisplay = document.getElementById("mission-time");
let missionStartTime = new Date();

const scene = new THREE.Scene();

const orientationDiv = document.getElementById("orientation-model");

const width = orientationDiv.clientWidth;
const height = orientationDiv.clientHeight;

const cameraa = new THREE.PerspectiveCamera(
    75,
    width/height,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x1f2d3d);
orientationDiv.appendChild(renderer.domElement);
cameraa.position.z = 5;

const geometry = new THREE.CylinderGeometry(
    0.5,
    0.5,
    2,
    32
);

const material = new THREE.MeshStandardMaterial({
    color: 0x00d4ff
});

const cansat = new THREE.Mesh(
    geometry,
    material
);

scene.add(cansat);
cansat.rotation.z = Math.PI / 2;

const light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(5, 5, 5);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
renderer.render(scene, cameraa);

const resetTimeButton = document.getElementById("reset-time-btn");
const syncTimeButton = document.getElementById("sync-time-btn");


function animate()
{
    requestAnimationFrame(animate);

    cansat.rotation.x = pitchval * Math.PI / 180;

    cansat.rotation.y = yawval * Math.PI / 180;

    cansat.rotation.z = Math.PI / 2 + (rollval * Math.PI / 180);

    renderer.render(scene, cameraa);
}

animate();

const altitudeChartCanvas = document.getElementById("altitude-graph");

    const altitudeChart = new Chart(altitudeChartCanvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Altitude (m)",
                data: [],
                borderColor: "cyan",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
const tempChartCanvas = document.getElementById("temperature-graph");

    const tempChart = new Chart(tempChartCanvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Temperature (deg C)",
                data: [],
                borderColor: "red",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    })
const pressureChartCanvas = document.getElementById("pressure-graph");

    const pressureChart = new Chart(pressureChartCanvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "pressure (deg C)",
                data: [],
                borderColor: "yellow",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

const batteryChartCanvas = document.getElementById("battery-graph");

    const batteryChart = new Chart(batteryChartCanvas, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Battery (percentage)",
                data: [],
                borderColor: "green",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            animation: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

const map = L.map("map").setView([latitudeval, longitudeval], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

    attribution: "© OpenStreetMap contributors"

}).addTo(map);
const marker = L.marker([latitudeval, longitudeval]).addTo(map);

/*UPDATE TELEMETRY*/

function updateTelemetry() {
    altitudeval = altitudeval - (8+ Math.random()*2);
    if (altitudeval < 0) {
        altitudeval=0;
    }
    descentRate= previousAltitude - altitudeval;
    previousAltitude = altitudeval;

    tempval = tempval + (Math.random() -0.5);

    pressureval = pressureval + (Math.random()-0.5)*2;

    batteryval = batteryval - 0.1;
    if (batteryval <0) {
        batteryval =0;
    }

    latitudeval = latitudeval + (Math.random() - 0.5) * 0.0001;
    longitudeval = longitudeval + (Math.random() - 0.5) * 0.0001;

    rollval = rollval + (Math.random() - 0.5) * 5;
    pitchval = pitchval + (Math.random() - 0.5) * 5;
    yawval = yawval + (Math.random() - 0.5) * 5;

    packetval++;

    altitude.textContent = altitudeval.toFixed(1);
    temperatureDisplay.textContent = tempval.toFixed(1);
    pressureDisplay.textContent = pressureval.toFixed(0);
    batteryDisplay.textContent = batteryval.toFixed(1);

    latitudeDisplay.textContent = latitudeval.toFixed(5);
    longitudeDisplay.textContent = longitudeval.toFixed(5);
    marker.setLatLng([latitudeval, longitudeval]);
    map.panTo([latitudeval, longitudeval]);

    rollDisplay.textContent = rollval.toFixed(1);
    pitchDisplay.textContent = pitchval.toFixed(1);
    yawDisplay.textContent = yawval.toFixed(1);
    packetDisplay.textContent = packetval;

    altitudeChart.data.labels.push(packetval);
    altitudeChart.data.datasets[0].data.push(altitudeval);
    if (altitudeChart.data.labels.length > 20)
    {
        altitudeChart.data.labels.shift();
        altitudeChart.data.datasets[0].data.shift();
    }
    altitudeChart.update();

    tempChart.data.labels.push(packetval);
    tempChart.data.datasets[0].data.push(tempval);
    if (tempChart.data.labels.length > 20)
    {
        tempChart.data.labels.shift();
        tempChart.data.datasets[0].data.shift();
    }
    tempChart.update();

    pressureChart.data.labels.push(packetval);
    pressureChart.data.datasets[0].data.push(pressureval);
    if (pressureChart.data.labels.length >20) {
        pressureChart.data.labels.shift();
        pressureChart.data.datasets[0].data.shift();
    }
    pressureChart.update();

    batteryChart.data.labels.push(packetval);
    batteryChart.data.datasets[0].data.push(batteryval);
    if (batteryChart.data.labels.length > 20 ) {
        batteryChart.data.labels.shift();
        batteryChart.data.datasets[0].data.shift();
    }
    batteryChart.update();
    descentRateDisplay.textContent= descentRate.toFixed(1);

    telemetryLog.push( {
        time: MissionDisplay.textContent,
        packet: packetval,
        altitude: altitudeval.toFixed(1),
        descentRate : descentRate.toFixed(1),
        temperature: tempval.toFixed(1),
        pressure: pressureval.toFixed(1),
        Battery : batteryval.toFixed(1),
        latitude: latitudeval.toFixed(1),
        longitude: longitudeval.toFixed(1),
        roll : rollval.toFixed(1),
        pitch: pitchval.toFixed(1),
        yaw: yawval.toFixed(1)
    });

}

function updateMissionTimer() {
    const now = new Date();
    const elapsedSeconds = Math.floor(
        (now - missionStartTime) / 1000
    );
    let hours = Math.floor(elapsedSeconds / 3600);
    let minutes = Math.floor(
        (elapsedSeconds % 3600) / 60
    );
    let seconds = elapsedSeconds % 60;
    MissionDisplay.textContent =
        hours.toString().padStart(2, "0") + ":" +
        minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0");
}

function updateErrorCode()
{
    let errorCode = "";
    // Digit 1 - Descent Rate
    if(descentRate >= 8 && descentRate <=10)
    {
        errorCode += "0";
    }
    else
    {
        errorCode += "1";
    }
    // Digit 2 - GPS
    errorCode += "0";
    // Digit 3 - Battery
    if(batteryval > 20)
    {
        errorCode += "0";
    }
    else
    {
        errorCode += "1";
    }
    // Digit 4 - Telemetry
    errorCode += "0";

    errorCodeDisplay.textContent = errorCode;

    if(errorCode === "0000")
{
    errorCodeDisplay.style.color = "#00ff88";
}
else
{
    errorCodeDisplay.style.color = "red";
}
}


let telemetryTimer = null;

const Startbutton = document.getElementById("start-btn");
const Stopbutton = document.getElementById("stop-btn");
const ExportButton = document.getElementById("export-btn");

Startbutton.addEventListener("click", function() {
    if (telemetryTimer === null) {
            telemetryTimer = setInterval(function() {
                updateTelemetry();
                updateMissionTimer();
                updateErrorCode();
            },1000)
        }
})

Stopbutton.addEventListener("click", function() {
    if (telemetryTimer != null) {
        clearInterval(telemetryTimer);
        telemetryTimer=null;
    }
})

ExportButton.addEventListener("click", function(){
    console.log("exporting!!");
    let csv = "time, packet,altitude, descentRate, temperature, pressure, Battery, latitude, longitude, roll, pitch, yaw\n";
    telemetryLog.forEach(function(packet) {
        csv += `${packet.time},${packet.packet},${packet.altitude},${packet.descentRate},${packet.temperature},${packet.pressure},${packet.battery},${packet.latitude},${packet.longitude},${packet.roll},${packet.pitch},${packet.yaw}\n`;
    });
     const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "telemetry_log.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
})

async function loadCameras(){
    console.log("loading camera");
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const cameras = devices.filter(function(device) {
        return device.kind === "videoinput";
    });
    cameraSelect.innerHTML = "";
    cameras.forEach(function(cameraDevice){
        const option = document.createElement("option");
        option.value = cameraDevice.deviceId;
        option.textContent = cameraDevice.label || "Camera";
        cameraSelect.appendChild(option);
    });
}

startCameraButton.addEventListener("click", async function () {
    try {
        currentStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
        camera.srcObject = currentStream;
        await loadCameras();
        cameraStatus.textContent = "🟢 Streaming";
        cameraStatus.style.color = "lime";
    }
    catch(error) {
        console.log(error);
        cameraStatus.textContent = "🔴 Camera Error";
        cameraStatus.style.color = "red";
    }
});
stopCameraButton.addEventListener("click", function () {
    if (currentStream !== null) {
        currentStream.getTracks().forEach(function(track) {
            track.stop();
        });
        camera.srcObject = null;
        currentStream = null;
        cameraStatus.textContent = "🔴 Stopped";
        cameraStatus.style.color = "red";
    }
});
loadCameras();

resetTimeButton.addEventListener("click", function() {
    elapsedSeconds=0;
    MissionDisplay.textContent = "00:00:00";
});

syncTimeButton.addEventListener("click", function() {
    const now= new Date();
    const Hours = now.getHours();
    const Minutes = now.getMinutes();
    const Secnd = now.getSeconds();
    MissionDisplay.textContent= Hours.toString().padStart(2,"0")+":"+Minutes.toString().padStart(2,"0")+":"+Secnd.toString().padStart(2,"0");
});

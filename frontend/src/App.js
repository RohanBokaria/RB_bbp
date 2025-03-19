import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const App = () => {
    const [file, setFile] = useState(null);
    const [pump1, setPump1] = useState('Glucose');
    const [pump2, setPump2] = useState('Base');
    const [runId, setRunId] = useState('');
    const [runs, setRuns] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    useEffect(() => {
        fetchRuns();
    }, []);

    const fetchRuns = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/runs/');
            console.log('Fetched runs:', response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
                setRuns(response.data);
            } else {
                console.warn('No runs found');
            }
        } catch (error) {
            console.error("Error fetching runs:", error);
        }
    };

    useEffect(() => {
        if (!runId) return;
        
        axios.get(`http://127.0.0.1:8000/data/${runId}`)
            .then(response => {
                console.log("Fetched graph data:", response.data);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setGraphData(response.data);
                } else {
                    setGraphData([]);
                    console.warn("No data found for this Run ID.");
                }
            })
            .catch(error => console.error("Error fetching run data:", error));
    }, [runId]);

    const handleFileUpload = async () => {
        if (!file) {
            setUploadStatus("Please select a file.");
            return;
        }

        console.log("Pump1 Value Before Upload:", pump1);
        console.log("Pump2 Value Before Upload:", pump2);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("pump1_choice", pump1);
        formData.append("pump2_choice", pump2);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setUploadStatus("File uploaded successfully!");
            console.log("Upload success:", response.data);
            
            // Fetch updated runs list
            fetchRuns();
        } catch (error) {
            console.error("Error uploading file:", error);

            if (error.response) {
                setUploadStatus(`File upload failed: ${error.response.data.detail || "Server error"}`);
                console.error("Server response:", error.response);
            } else if (error.request) {
                setUploadStatus("File upload failed: No response from server.");
                console.error("No response received:", error.request);
            } else {
                setUploadStatus(`File upload failed: ${error.message}`);
                console.error("Error setting up request:", error.message);
            }
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h1 style={{ color: "#333" }}>Boston Bioprocess Viewer</h1>
            <p>Select a CSV file and upload it to visualize fermentation data.</p>

            {/* File Upload Section */}
            <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <select onChange={(e) => {
                    console.log("Pump1 Selected:", e.target.value);
                    setPump1(e.target.value);
                }} style={{ marginLeft: "10px" }}>
                    <option value="Glucose">Glucose</option>
                    <option value="Glycerol">Glycerol</option>
                </select>
                <select onChange={(e) => {
                    console.log("Pump2 Selected:", e.target.value);
                    setPump2(e.target.value);
                }} style={{ marginLeft: "10px" }}>
                    <option value="Base">Base</option>
                    <option value="Acid">Acid</option>
                </select>
                <button onClick={handleFileUpload} style={{ marginLeft: "10px", padding: "5px 10px" }}>
                    Upload
                </button>
                <p>{uploadStatus}</p>
            </div>

            {/* Run Selection Section */}
            <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
                <h3>Select a Run ID</h3>
                <select onChange={(e) => setRunId(e.target.value)} value={runId}>
                    <option value=''>Select</option>
                    {runs.length > 0 ? (
                        runs.map(run => (
                            <option key={run.run_id} value={run.run_id}>{run.run_id}</option>
                        ))
                    ) : (
                        <option disabled>No Runs Available</option>
                    )}
                </select>
            </div>

            {/* Graph Section */}
            <div style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
                {graphData.length > 0 ? (
                    <Plot
                        data={[
                            {
                                x: graphData.map(d => d.time),
                                y: graphData.map(d => d.Pump1),
                                type: "scatter",
                                mode: "lines",
                                name: "Pump1 (Glycerol/Glucose)",
                                yaxis: "y1"
                            },
                            {
                                x: graphData.map(d => d.time),
                                y: graphData.map(d => d.Pump2),
                                type: "scatter",
                                mode: "lines",
                                name: "Pump2 (Acid/Base)",
                                yaxis: "y1"
                            },
                            {
                                x: graphData.map(d => d.time),
                                y: graphData.map(d => d.pH),
                                type: "scatter",
                                mode: "lines",
                                name: "pH",
                                yaxis: "y2"
                            },
                            {
                                x: graphData.map(d => d.time),
                                y: graphData.map(d => d.Temperature),
                                type: "scatter",
                                mode: "lines",
                                name: "Temperature",
                                yaxis: "y3"
                            }
                        ]}
                        layout={{
                            title: `Run ID: ${runId}`,
                            xaxis: { title: "Time" },
                            yaxis: { title: "Value", side: "left" },
                            yaxis2: { title: "pH", overlaying: 'y', side: 'right' },
                            yaxis3: { title: "Temperature", overlaying: 'y', side: 'right' }
                        }}
                    />
                ) : (
                    <p>No data to display. Select a run to view the graph.</p>
                )}
            </div>
        </div>
    );
};

export default App;
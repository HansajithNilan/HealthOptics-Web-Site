import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import { FaCamera, FaExpandAlt, FaCompress, FaUndo, FaRedo, FaTimes } from "react-icons/fa";
import "./TrySpectacles.css";

const TrySpectacles = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageUrl } = location.state || {};
    const webcamRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [position, setPosition] = useState({ x: 200, y: 150 });
    const [size, setSize] = useState(200);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const initializeFaceDetection = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                setIsInitialized(true);
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };

        initializeFaceDetection();
    }, []);

    useEffect(() => {
        if (!isInitialized || !webcamRef.current) return;

        const detectFace = async () => {
            if (!webcamRef.current.video || !webcamRef.current.video.readyState === 4) return;

            const video = webcamRef.current.video;
            const detection = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detection) {
                const landmarks = detection.landmarks;
                const leftEye = landmarks.getLeftEye();
                const rightEye = landmarks.getRightEye();

                // Calculate center position between eyes
                const centerX = (leftEye[0].x + rightEye[3].x) / 2;
                const centerY = (leftEye[0].y + rightEye[3].y) / 2;

                // Calculate appropriate size based on eye distance
                const eyeWidth = Math.abs(rightEye[3].x - leftEye[0].x);
                const newSize = eyeWidth * 2.5;

                setSize(newSize);
                setPosition({
                    x: centerX - (newSize / 2),
                    y: centerY - (newSize / 4)
                });
            }
        };

        const interval = setInterval(detectFace, 100);
        return () => clearInterval(interval);
    }, [isInitialized]);

    const handleDragStart = (e) => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData("offsetX", e.clientX - rect.left);
        e.dataTransfer.setData("offsetY", e.clientY - rect.top);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const container = document.querySelector(".webcam-container");
        const rect = container.getBoundingClientRect();
        const offsetX = parseFloat(e.dataTransfer.getData("offsetX"));
        const offsetY = parseFloat(e.dataTransfer.getData("offsetY"));

        let newX = e.clientX - rect.left - offsetX;
        let newY = e.clientY - rect.top - offsetY;

        setPosition({ x: newX, y: newY });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const increaseSize = () => setSize(prev => prev + 20);
    const decreaseSize = () => setSize(prev => Math.max(50, prev - 20));
    const rotateLeft = () => setRotation(prev => prev - 5);
    const rotateRight = () => setRotation(prev => prev + 5);

    const captureImage = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = 'spectacles-tryout.png';
            link.click();
        }
    };

    return (
        <div className="try-spectacles-container">
            {!isInitialized && <div className="loading">Loading face detection...</div>}
            <div className="header-controls">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaTimes />
                </button>
                <div className="controls-container">
                    <button onClick={decreaseSize}><FaCompress /></button>
                    <button onClick={increaseSize}><FaExpandAlt /></button>
                    <button onClick={rotateLeft}><FaUndo /></button>
                    <button onClick={rotateRight}><FaRedo /></button>
                    <button onClick={captureImage}><FaCamera /></button>
                </div>
            </div>
            <div className="webcam-container" onDragOver={handleDragOver} onDrop={handleDrop}>
                <Webcam
                    ref={webcamRef}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    className="webcam-feed"
                    width={640}
                    height={480}
                />
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Spectacle Overlay"
                        className="spectacle-overlay"
                        draggable="true"
                        onDragStart={handleDragStart}
                        style={{
                            position: "absolute",
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: `${size}px`,
                            transform: `rotate(${rotation}deg)`,
                            cursor: 'move'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default TrySpectacles;

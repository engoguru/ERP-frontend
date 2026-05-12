import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function CameraCapture({ item, handleFileUpload }) {
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);

    const captureImage = async () => {
        if (!webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot();

        if (!imageSrc) {
            console.error("Failed to capture image");
            return;
        }

        try {
            const res = await fetch(imageSrc);
            const blob = await res.blob();

            const file = new File(
                [blob],
                "capture.jpg",
                { type: "image/jpeg" }
            );

            handleFileUpload(item._id, [file]);

            setShowCamera(false);
        } catch (error) {
            console.error("Error capturing image:", error);
        }
    };

    return (
        <div>
            {!showCamera ? (
                <button
                    onClick={() => setShowCamera(true)}
                    className="px-1 py-1 text-xs font-normal text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition"
                >
                    Take
                </button>
            ) : (
                <div className="space-y-2">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: { ideal: "environment" },
                        }}
                        className="w-64 rounded-lg"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={captureImage}
                            className="px-2 py-1 text-white bg-blue-600 rounded"
                        >
                            Capture
                        </button>

                        <button
                            onClick={() => setShowCamera(false)}
                            className="px-2 py-1 text-white bg-gray-500 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CameraCapture;
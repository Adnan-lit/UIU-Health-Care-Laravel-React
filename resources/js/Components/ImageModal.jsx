import React, {useEffect, useRef, useState} from "react";
import {Download, RefreshCcw, RotateCw, Share, X, ZoomIn, ZoomOut} from "lucide-react";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
    const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
    const resetZoom = () => {
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && scale > 1) {
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const maxX = (containerRect.width * (scale - 1)) / 2;
            const maxY = (containerRect.height * (scale - 1)) / 2;
            const boundedX = Math.min(Math.max(newX, -maxX), maxX);
            const boundedY = Math.min(Math.max(newY, -maxY), maxY);

            setPosition({ x: boundedX, y: boundedY });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (!isOpen) resetZoom();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="glass-modal-container">
                <div className="modal-header">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">Image Preview</h3>
                        <span className="text-sm text-gray-500">{Math.round(scale * 100)}%</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div
                    ref={containerRef}
                    className="modal-body"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div className="controls">
                        <button className="control-btn" onClick={handleZoomIn} title="Zoom In">
                            <ZoomIn />
                        </button>
                        <button className="control-btn" onClick={handleZoomOut} title="Zoom Out">
                            <ZoomOut />
                        </button>
                        <button className="control-btn" onClick={handleRotate} title="Rotate">
                            <RotateCw />
                        </button>
                        <button className="control-btn reset" onClick={resetZoom} title="Reset">
                            <RefreshCcw />
                        </button>
                    </div>
                    <div className="image-container">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="preview-image"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                            }}
                            onMouseDown={handleMouseDown}
                            draggable={false}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={() => window.open(imageUrl, '_blank')}
                        className="action-btn share"
                    >
                        <Share className="icon" />
                        Share
                    </button>
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = imageUrl;
                            link.download = 'image';
                            link.click();
                        }}
                        className="action-btn primary"
                    >
                        <Download className="icon" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ImageModal;

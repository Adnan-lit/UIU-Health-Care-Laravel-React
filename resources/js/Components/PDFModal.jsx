import React, { useState } from 'react';
import { X, Download, Share, ZoomIn, ZoomOut } from 'lucide-react';


const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
    const [scale, setScale] = useState(1);



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="glass-modal-container max-w-4xl w-full h-[80vh]">
                <div className="modal-header">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800">PDF Preview</h3>
                        <span className="text-sm text-gray-500">{Math.round(scale * 100)}%</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="modal-body relative flex-1 overflow-hidden">
                
                    
                    <iframe
                        src={`${pdfUrl}#zoom=${scale}`}
                        className="w-full h-full border-0"
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'center center'
                        }}
                    />
                </div>

                <div className="modal-footer">
                    <button
                        onClick={() => window.open(pdfUrl, '_blank')}
                        className="action-btn share"
                    >
                        <Share className="icon" />
                        Open in New Tab
                    </button>
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = pdfUrl;
                            link.download = 'document.pdf';
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

export default PDFModal; 
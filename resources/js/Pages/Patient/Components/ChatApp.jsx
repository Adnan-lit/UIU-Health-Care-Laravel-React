import React, { useEffect, useState, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { formatDistance, parseISO } from "date-fns";
import ImageModal from "@/Components/ImageModal.jsx";
import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";
import PDFModal from "@/Components/PDFModal.jsx";

const ChatApp = ({ messageHistory, blobSasUrl }) => {
    const { auth } = usePage().props;
    const timeZone = 'Asia/Dhaka';

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };


    const handlePDFClick = (pdfUrl) => {
        setSelectedPdf(pdfUrl);
        setPdfModalOpen(true);
    };

    function getFileTypeFromUrl(url) {
        // Remove query parameters and fragments
        const cleanUrl = url.split(/[?#]/)[0];
        // Extract the file extension
        const extension = cleanUrl.split('.').pop().trim().toLowerCase();
      
        // Map of common file extensions to MIME types
        const mimeTypes = {
          'jpg': 'image',
          'jpeg': 'image',
          'png': 'image',
          'gif': 'image',
          'webp': 'image',
          'pdf': 'pdf',
          // Add more mappings as needed
        };
      
        // Return the corresponding MIME type or a default value
        return mimeTypes[extension] || 'application/octet-stream';
      }

    const formatMessageTime = (timestamp) => {
        try {
            const date = typeof timestamp === 'string' 
                ? parseISO(timestamp) 
                : new Date(timestamp);
            
            const now = new Date();
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));

            // Adjust for timezone offset (for Bangladesh, UTC+6)
            const timezoneOffset = 6 * 60; // 6 hours in minutes
            const adjustedDiffInMinutes = diffInMinutes - timezoneOffset;

            if (adjustedDiffInMinutes < 1) {
                return 'just now';
            } else if (adjustedDiffInMinutes < 60) {
                return `${adjustedDiffInMinutes} ${adjustedDiffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
            } else {
                return formatDistance(date, now, { 
                    addSuffix: true,
                    includeSeconds: true
                });
            }
        } catch (error) {
            console.error('Time formatting error:', error);
            return 'recently';
        }
    };

    // Initialize messages with timezone adjustment
    const initialMessages = messageHistory.map((message) => ({
        id: message.id,
        senderId: message.sender_id,
        receiverId: message.receiver_id,
        sender: message.sender_name,
        receiver: message.receiver_name,
        role: message.senderRole,
        senderPic: message.sender_photo,
        receiverPic: message.receiver_photo,
        timestamp: message.timestamp,
        time: formatMessageTime(message.timestamp),
        content: message.content,
        filePath: message.filePath,
        isMine: message.sender_id === auth.user.id,
    }));

    const [messages, setMessages] = useState(initialMessages);
    const [currentMessage, setCurrentMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [chatList, setChatList] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentRecieverPic, setCurrentRecieverPic] = useState("");
    const [uploadingFile, setUploadingFile] = useState(false);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);
    const [uploadedFileType, setUploadedFileType] = useState(null);
    const fileInputRef = useRef(null);

    // Add ref for message container
    const messagesEndRef = useRef(null);

    // Add scroll to bottom function
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Update chat list with proper timezone handling
    useEffect(() => {
        const conversationMap = new Map();

        messages.forEach((msg) => {
            let partnerId, partnerInfo;

            if (msg.senderId === auth.user.id) {
                partnerId = msg.receiverId;
                partnerInfo = {
                    name: msg.receiver,
                    profilePic: msg.receiverPic,
                    role: "Receiver",
                };
            } else {
                partnerId = msg.senderId;
                partnerInfo = {
                    name: msg.sender,
                    profilePic: msg.senderPic,
                    role: msg.role,
                };
            }

            const existing = conversationMap.get(partnerId);
            const msgDate = typeof msg.timestamp === 'string' 
                ? parseISO(msg.timestamp) 
                : new Date(msg.timestamp);

            if (!existing || msgDate > parseISO(existing.timestamp)) {
                conversationMap.set(partnerId, {
                    userId: partnerId,
                    name: partnerInfo.name,
                    profilePic: partnerInfo.profilePic,
                    role: partnerInfo.role,
                    lastMessage: msg.content,
                    timestamp: msgDate.toISOString(),
                    time: formatMessageTime(msgDate),
                });
            }
        });

        const uniqueChats = Array.from(conversationMap.values())
            .filter(chat => chat.userId !== auth.user.id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setChatList(uniqueChats);

        if (selectedChatId === null && uniqueChats.length > 0) {
            setSelectedChatId(uniqueChats[0].userId);
            setCurrentRecieverPic(uniqueChats[0].profilePic);
        }
    }, [messages, auth.user.id]);

    const filteredMessages = messages.filter((message) =>
        (message.senderId === selectedChatId && message.receiverId === auth.user.id) ||
        (message.senderId === auth.user.id && message.receiverId === selectedChatId)
    );

    // Update real-time message handling
    useEffect(() => {
        Echo.private(`messaging.${auth.user.id}`)
            .listen(".MessageReceiveEvent", (e) => {
                console.log('Received message data:', e.messageData); // For debugging
                
                // Find the sender's info from existing chat list
                const senderInfo = chatList.find(chat => chat.userId === e.messageData.sender_id);
                
                const newMessage = {
                    id: e.messageData.id,
                    senderId: e.messageData.sender_id,
                    receiverId: e.messageData.receiver_id,
                    sender: e.messageData.sender_name,
                    receiver: auth.user.name,
                    role: e.messageData.senderRole,
                    // Use existing sender pic from chat list if available, otherwise use from event
                    senderPic: senderInfo?.profilePic || e.messageData.senderPic,
                    receiverPic: auth.user.photo,
                    timestamp: e.messageData.timestamp,
                    time: formatMessageTime(parseISO(e.messageData.timestamp)),
                    content: e.messageData.content,
                    filePath: e.messageData.filePath || "",
                    isMine: false,
                };

                setMessages(prev => {
                    // Check if message already exists to prevent duplicates
                    if (!prev.some(msg => msg.id === newMessage.id)) {
                        return [...prev, newMessage];
                    }
                    return prev;
                });
            })
            .error((error) => console.error("Channel subscription error:", error));
    }, [auth.user.id, chatList]); // Add chatList to dependencies

    const handleSendMessage = () => {
        if ((uploadedFilePath && selectedChatId) || (currentMessage.trim() && selectedChatId)) {
            const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const currentChat = chatList.find(chat => chat.userId === selectedChatId);
            
            const newMessage = {
                id: `temp-${Date.now()}`,
                senderId: auth.user.id,
                receiverId: selectedChatId,
                sender: auth.user.name,
                receiver: currentChat?.name,
                role: "User",
                senderPic: auth.user.photo,
                receiverPic: currentChat?.profilePic,
                timestamp: timestamp,
                time: formatMessageTime(parseISO(timestamp)),
                content: currentMessage,
                filePath: uploadedFilePath || "",
                isMine: true,
            };

            setMessages(prev => [...prev, newMessage]);
            setCurrentMessage("");
            setCurrentRecieverPic(currentChat?.profilePic);

            router.post(
                "/send-message",
                {
                    content: currentMessage,
                    filePath: uploadedFilePath || "",
                    timestamp,
                    receiver_id: selectedChatId,
                },
                { preserveScroll: true }
            );
            setUploadedFilePath(null);
            setUploadedFileType(null);
            setUploadingFile(false);
            fileInputRef.current.value = null;
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            try {
                const result = await axios.get(`/search-users?q=${query}`);
                console.log('Search results:', result.data.users); // For debugging
                setSearchResults(result.data.users);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const startConversation = (userId) => {
        const selectedUser = searchResults.find(user => user.id === userId);
        if (selectedUser) {
            // Create a new chat entry if it doesn't exist
            const newChat = {
                userId: selectedUser.id,
                name: selectedUser.name,
                profilePic: selectedUser.profile_photo_path,
                role: selectedUser.role,
                lastMessage: "",
                timestamp: new Date().toISOString(),
                time: formatMessageTime(new Date()),
            };

            // Add to chat list if not already present
            setChatList(prev => {
                if (!prev.some(chat => chat.userId === selectedUser.id)) {
                    return [...prev, newChat];
                }
                return prev;
            });

            setSelectedChatId(userId);
            setCurrentRecieverPic(selectedUser.profile_photo_path);
            setSearchQuery("");
            setSearchResults([]);
        }
    };

    // Update scroll behavior when selecting a chat
    const handleChatSelect = (chatId) => {
        setSelectedChatId(chatId);
        // Add a small delay to ensure messages are rendered
        setTimeout(scrollToBottom, 100);
    };

    // Update scroll behavior when messages change
    useEffect(() => {
        if (selectedChatId) {
            scrollToBottom();
        }
    }, [filteredMessages, selectedChatId]);

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if file is an image or PDF and under 5MB
            if ((file.type.startsWith('image/') || file.type === 'application/pdf') && file.size <= 5 * 1024 * 1024) {
                setUploadingFile(true);
                try {
                    const filePath = await uploadToBlob(file);
                    if (filePath) {
                        setUploadedFilePath(filePath);
                        setUploadedFileType(file.type);
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert('Failed to upload file');
                } finally {
                    setUploadingFile(false);
                }
            } else {
                alert('Please select an image or PDF file under 5MB');
            }
        }
    };

    const uploadToBlob = async (file) => {
        const containerName = "uiuhealthcare";

        try {
            const blobServiceClient = new BlobServiceClient(blobSasUrl);
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // Create a unique blob name with proper folder structure
            const blobName = `chat-attachments/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Set content type
            const options = {
                blobHTTPHeaders: {
                    blobContentType: file.type
                }
            };

            // Upload the file
            await blockBlobClient.uploadBrowserData(file, options);
            
            return blockBlobClient.url;
        } catch (error) {
            console.error("Error uploading to blob storage:", error);
            throw error;
        }
    };

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    const removeAttachment = () => {
        setUploadedFilePath(null);
        setUploadedFileType(null);
    };

    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");

    return (
        <div className="flex h-[80vh] bg-beige-100 font-sans">
            {/* Chat List Sidebar */}
            <div className="w-1/3 bg-white shadow-md rounded-l-xl flex flex-col">
                <div className="flex items-center space-x-3 p-4 border-b">
                    <input
                        type="text"
                        placeholder="Search Messages or Users"
                        className="w-full p-2 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div className="overflow-y-auto flex-grow">
                    {searchQuery ? (
                        searchResults.map((user) => (
                            <div
                                key={user.id}
                                className="p-4 flex items-center hover:bg-orange-100 transition cursor-pointer border-b"
                                onClick={() => startConversation(user.id)}
                            >
                                <img
                                    alt="profile"
                                    src={user.profile_photo_path}
                                    className="w-10 h-10 bg-gray-300 rounded-full mr-1"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 mr-2">
                                        {user.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 truncate">
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        chatList.map((chat) => (
                            <div
                                key={chat.userId}
                                className={`p-4 flex items-center hover:bg-orange-100 transition cursor-pointer border-b ${
                                    chat.userId === selectedChatId ? "bg-orange-200" : ""
                                }`}
                                onClick={() => handleChatSelect(chat.userId)}
                            >
                                <img
                                    alt="profile"
                                    src={chat.profilePic}
                                    className="w-10 h-10 bg-gray-300 rounded-full mr-1"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-800 mr-2">
                                        {chat.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 truncate">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {chat.time}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-beige-50 rounded-xl">
                {selectedChatId ? (
                    <>
                        <div className="p-4 flex items-center bg-white border-b rounded-tr-xl">
                            <img
                                src={chatList.find(chat => chat.userId === selectedChatId)?.profilePic}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-1"
                            />
                            <div className="ml-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {chatList.find(chat => chat.userId === selectedChatId)?.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {chatList.find(chat => chat.userId === selectedChatId)?.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto mt-2">
                            {filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.isMine ? "justify-end" : "justify-start"
                                    } space-x-3 mb-4`}
                                >
                                    {!message.isMine && (
                                        <img
                                            src={message.senderPic}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    )}
                                    <div>
                                        
                                        {message.filePath && getFileTypeFromUrl(message.filePath) === 'image' &&  (
                                            <img
                                                alt="Message attachment"
                                                className="w-[30%] rounded-xl p-2 cursor-pointer hover:opacity-90 transition"
                                                src={message.filePath}
                                                onClick={() => handleImageClick(message.filePath)}
                                            />
                                        )}

                                        {message.filePath && getFileTypeFromUrl(message.filePath) === 'pdf' && (
                                            <div 
    
                                                onClick={() => handlePDFClick(message.filePath)}
                                             className="flex items-center bg-gray-50 p-2 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                <span className="ml-2 text-sm text-gray-600">PDF Document</span>
                                            </div>
                                        )}

                                        {message.content && (
                                        <p
                                            className={`p-3 rounded-xl text-sm ${
                                                message.isMine
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-gray-300 text-gray-800"
                                            }`}
                                        >
                                            {message.content}
                                        </p>)}
                                        <span
                                            className={`text-xs text-gray-400 block ${
                                                message.isMine ? "text-right" : ""
                                            }`}
                                        >
                                            {message.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t space-y-2">
                            {/* File Preview Area */}
                            {uploadedFilePath && (
                                <div className="flex items-center bg-gray-50 p-2 rounded-lg">
                                    {uploadedFileType?.startsWith('image/') ? (
                                        <img 
                                            src={uploadedFilePath} 
                                            alt="Upload preview" 
                                            className="h-16 w-16 object-cover rounded-md"
                                        />
                                    ) : (
                                        <div className="flex items-center bg-gray-100 rounded-md p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <span className="ml-2 text-sm text-gray-600">PDF Document</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={removeAttachment}
                                        className="ml-2 p-1 text-red-500 hover:text-red-700"
                                        title="Remove attachment"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="flex items-center space-x-3">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*,.pdf"
                                    onChange={handleFileSelect}
                                />
                                
                                {/* Attachment button */}
                                <button
                                    onClick={handleAttachmentClick}
                                    className={`p-2 text-gray-500 hover:text-orange-500 transition rounded-full hover:bg-orange-50 ${
                                        uploadingFile ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    disabled={uploadingFile}
                                    title="Attach file (Image or PDF)"
                                >
                                    {uploadingFile ? (
                                        <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                        </svg>
                                    )}
                                </button>

                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 p-3 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                                />
                                
                                <button
                                    className={`p-3 text-white rounded-full transition ${
                                        currentMessage.trim() || uploadedFilePath
                                            ? 'bg-orange-500 hover:bg-orange-600'
                                            : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                    onClick={handleSendMessage}
                                    disabled={!currentMessage.trim() && !uploadedFilePath}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>

            <ImageModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                imageUrl={selectedImage}
            />
            <PDFModal
                isOpen={pdfModalOpen}
                onClose={() => setPdfModalOpen(false)}
                pdfUrl={selectedPdf}
            />
            
        </div>
    );
};

export default ChatApp;

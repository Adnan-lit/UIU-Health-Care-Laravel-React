<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MessengerNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $messageData;
    public function __construct($messageData)
    {
        $this->messageData = $messageData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database','broadcast'];
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'sender_id' => $this->messageData['sender_id'],
            'receiver_id' => $this->messageData['receiver_id'],
            'sender_name' => $this->messageData['sender_name'],
            'content' => $this->messageData['content'],
            'filePath' => $this->messageData['filePath'],
            'timestamp' => $this->messageData['timestamp'],
        ];
    }
}

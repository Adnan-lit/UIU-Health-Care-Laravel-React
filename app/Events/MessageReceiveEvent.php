<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageReceiveEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;



    /**
     * Create a new event instance.
     */
    public function __construct(public $messageData)
    {

    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("messaging.{$this->messageData['receiver_id']}"),
        ];
    }

    /**
     * Define the event name (optional).
     */
    public function broadcastAs(): string
    {
        return 'MessageReceiveEvent';
    }
}

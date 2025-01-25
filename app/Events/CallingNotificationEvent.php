<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CallingNotificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;



    /**
     * Create a new event instance.
     */
    public function __construct(public string $sender, public User  $receiver, public $consultationID)
    {

    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("calling.{$this->receiver->id}"),
        ];
    }

    /**
     * Define the event name (optional).
     */
    public function broadcastAs(): string
    {
        return 'CallingNotificationEvent';
    }
}

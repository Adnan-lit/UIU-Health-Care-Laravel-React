<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class CallingNotification extends Notification
{
    use Queueable;

    private $callDetails;

    public function __construct($callDetails)
    {
        $this->callDetails = $callDetails;
    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    public function toArray($notifiable)
    {
        return [
            'caller_id' => $this->callDetails['caller_id'],
            'caller_name' => $this->callDetails['caller_name'],
            'message' => $this->callDetails['message'],
            'call_time' => $this->callDetails['call_time'],
        ];
    }
}

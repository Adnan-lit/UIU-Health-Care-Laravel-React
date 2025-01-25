<?php

namespace App\Http\Controllers;

use App\Events\CallingNotificationEvent;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CallingNotificationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $sender = auth()->user();
        $receiverID = $request->receiverID;
        $consultationID = $request->consultationID;


        $receiver = User::find($receiverID);

        broadcast(new CallingNotificationEvent($sender, $receiver, $consultationID));

    }
}

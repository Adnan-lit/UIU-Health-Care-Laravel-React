<?php

namespace App\Http\Controllers;

use App\Events\CallingNotificationEvent;
use App\Events\MessageReceiveEvent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class MessageController extends Controller
{


    public function sendMessage(Request $request)
    {


        $validate = $request->validate([
            'content' => 'nullable',
            'receiver_id' => 'required',
            'filePath' => 'nullable|string',
            'timestamp' => 'required'
        ]);

        $messageData = [
            'content' => $validate['content'] ?? '',
            'receiver_id' => $validate['receiver_id'],
            'filePath' => $validate['filePath'] ?? '',
            'timestamp' => $validate['timestamp'],
            'sender_id' => auth()->user()->id,
            'id' => rand(1000, 99999999999999)
        ];

        DB::table('messages')->insert($messageData);
        $broadcastData = array_merge($messageData, [
            'senderPic' => DB::table('users')->where('id', $messageData['sender_id'])->first()->profile_photo_path,
            'sender_name' => auth()->user()->name,
        ]);

        broadcast(new MessageReceiveEvent($broadcastData));

        // return response()->json(['message' => 'Message sent successfully', 'data' => $broadcastData]);


    }

    public function searchUsers(Request $request)
    {
        //get query from query params
        $search = $request['q'];
        $users = DB::table('users')->where('name', 'like', '%' . $search . '%')->get();
        return response()->json(['users' => $users], 200);
    }

    public function getMessages()
    {
        $messages = Message::with(['sender', 'receiver'])->get()->map(function ($message) {
            return [
                // ... other fields ...
                'timestamp' => $message->created_at->setTimezone('Asia/Dhaka')->toISOString(),
            ];
        });

        return response()->json($messages);
    }
}

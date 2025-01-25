<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('calling.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('messaging.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

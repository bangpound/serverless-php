<?php

$loader = require __DIR__ . '/vendor/autoload.php';

use App\Context;

// Set up service container
$kernel = new \App\Kernel('prod', false);
$kernel->boot();
$container = $kernel->getContainer();

// Get event data and context object
$event = json_decode($argv[1], true) ?: [];
$logger = $container->get('logger');
$fd = fopen('php://fd/3', 'r+');
$context = new Context($logger, $argv[2], $fd);

// Get the handler service and execute
$handler = $container->get(getenv('HANDLER'));
$response = $handler->handle($event, $context);

// Send data back to shim
exit(json_encode($response));

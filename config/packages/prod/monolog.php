<?php

use Symfony\Component\Config\Resource\ClassExistenceResource;
use Symfony\Component\Console\Application;

$handlers = [
    'main' => [
        'type' => 'fingers_crossed',
        'action_level' => 'debug',
        'handler' => 'nested',
    ],
    'nested' => [
        'type' => 'stream',
        'path' => 'php://stderr',
        'level' => 'debug',
        'formatter' => 'app.monolog.formatter.line',
    ],
];

$container->addResource(new ClassExistenceResource(Application::class));
if (class_exists(Application::class)) {
    $handlers['console'] = [
        'type' => 'console',
        'process_psr_3_messages' => false,
        'channels' => ['!event', '!doctrine'],
    ];
}

$container->loadFromExtension('monolog', [
    'handlers' => $handlers,
]);

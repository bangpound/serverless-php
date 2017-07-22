<?php

namespace App\Lambda;

class HelloFunction implements FunctionInterface
{
    /**
     * {@inheritdoc}
     */
    public function __invoke(array $event, Context $context)
    {
        $logger = $context->getLogger();
        $logger->notice('Got event', $event);

        return [
            'statusCode' => 200,
            'body' => 'Go Serverless v1.0! Your function executed successfully!',
        ];
    }
}

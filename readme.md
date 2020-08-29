Make sqs with delay seconds = 10
Messages arent read by queue till after 10sec
Batch size 10 messages

SQS can and will send duplicate messages, idk why. Has to be handled at application level
If Im using this in hubspot for real must:
1. Check for duplicated messages in batch
2. Before creating hubspot deal must lookup HubspotDeals table first to see if deal has already been created. If exists, exit

Ok apparently FIFO removes dupes within 5mins that's good
But what if I send two messages with id = 1 within 5min, but I want both messages to be accepted?
Maybe I need an ID + Timestamp
So then FIFO queue isnt doing me any good either...
Lets see what happens with two same id messages within 5min before we start solving the next problem
import { SQSEvent } from 'aws-lambda';
import axios from 'axios';

export const handler = async (event: SQSEvent) => {
    console.log('swag swag boom')
    console.log(event.Records.map(r => r.body))
    const u: any = {}
    for(const r of event.Records) {
        const d = JSON.parse(r.body)
        u[d.id] = true
    }
    console.log('unique messages')
    console.log(
        Object.keys(u).length,
        '/',
        event.Records.length
    )
    await axios({
        method: 'post',
        url: 'https://discordapp.com/api/webhooks/582762988365283389/v9WzjFiTe5Z57TOn54VoSeDjhD85FA8iqVv2iqRpUFhPL5jyZdk55_hZUTCSPaJjZ4us',
        data: {
            content: 'Batch:```'
            + JSON.stringify(event.Records.map(r => JSON.parse(r.body).id))
            + '```'
        }
    })
}
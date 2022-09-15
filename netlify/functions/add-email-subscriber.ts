import axios from 'axios'

const handler = async (event, context) => {
    const listId = 'e5cb3d003e';
    const apiKey = '0594c7c454254e5b8fd789bee3e54e33-us14'

    const body = JSON.parse(event.body);
    const { email_address, merge_fields } = body

    if(!email_address) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Please provide a valid email address.'})
        }
    }
    try{
        const payload = {
            email_address,
            merge_fields,
            status: 'subscribed',
        }
        const { data } = await axios.post(`https://us14.api.mailchimp.com/3.0/lists/${listId}/members`, 
        payload,
        {
            headers: {
                Authorization: `Basic ${apiKey}`
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch(error) {
        console.log(error)
        return{
            statusCode:500,
            body: JSON.stringify(error)
        }

    }
}
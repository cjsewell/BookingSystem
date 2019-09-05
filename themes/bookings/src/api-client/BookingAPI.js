export const PostHeaders = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

class BookingAPI {
    request = {
        get: ({url}) => fetch(url).then((res) => res.json()),
        post: ({url, body}) => fetch(url, {...PostHeaders, body: body}).then((res) => res.json())
    }
}

export default new BookingAPI();
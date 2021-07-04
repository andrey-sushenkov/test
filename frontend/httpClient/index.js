import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default {
    async donate({ currency, amount }) {
        return api.post('/donate', { currency, amount })
    }
}

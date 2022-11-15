import axios from 'axios';

async function ProductRemove(id) {
	await axios.post('/product/remove', { id: id });
}

export {ProductRemove as default};